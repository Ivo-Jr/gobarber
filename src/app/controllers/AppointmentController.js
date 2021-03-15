import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
    async index(request, response) {
        const { page = 1 } = request.query;

        const appointments = await Appointment.findAll({
            where: { user_id: request.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date', 'past'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        return response.json(appointments);
    }

    async store(request, response) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = request.body;

        // Check if provider_id is a provider:
        // "provider_id" será um número e no segundo parametro dentro do 'where' é checaddo se o provider é true, isto é, se ele é um prestador de serviço.
        // userId é o usuário logado
        const checkIsProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        if (request.userId === provider_id) {
            return response.status(401).json({
                error: `You can't create appointments with yourself`,
            });
        }

        if (!checkIsProvider) {
            return response.status(401).json({
                error: 'You can only create appointments with providers',
            });
        }

        const hourStart = startOfHour(parseISO(date));

        // Check for past dates
        if (isBefore(hourStart, new Date())) {
            return response
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        // Check date availability
        // (O agendador/prestador de serviço, tem um agendamento nesse horário?)
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return response
                .status(400)
                .json({ error: 'Appointment date is not available' });
        }

        // 'request.userId' é o id do usuário que está logado na sessão. Pegamos esse id do payload do JWT.
        // Quando passamos o 'hourStart' na craiação do agendamento em "date: hourStart", garantimos que o agendamento será feito em horas exatas com os minutos zerados.
        const appointment = await Appointment.create({
            user_id: request.userId,
            provider_id,
            date: hourStart,
        });

        // Notify appointment provider:
        const user = await User.findByPk(request.userId);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            user: provider_id,
        });

        return response.json(appointment);
    }

    async delete(request, response) {
        const appointment = await Appointment.findByPk(request.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        if (appointment.user_id !== request.userId) {
            return response.status(401).json({
                error: "You don't have permission to cancel this appointment.",
            });
        }

        // Um agendamento só poderá ser cancelado com 2 horas de antecedência
        const dateWithSub = subHours(appointment.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            return response.status(401).json({
                error: 'You can only cancel appointments 2 hours in advance.',
            });
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        await Queue.add(CancellationMail.key, {
            appointment,
        });

        return response.json();
    }
}

export default new AppointmentController();
