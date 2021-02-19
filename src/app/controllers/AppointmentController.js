import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
    async index(request, response) {
        const appointments = await Appointment.findAll({
            where: { user_id: request.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
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
        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

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
        const appointment = await Appointment.create({
            user_id: request.userId,
            provider_id,
            date: hourStart,
        });

        return response.json(appointment);
    }
}

export default new AppointmentController();
