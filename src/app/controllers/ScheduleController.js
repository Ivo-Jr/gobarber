import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
    async index(request, response) {
        const checkUserProvider = await User.findOne({
            where: { id: request.userId, provider: true },
        });

        if (!checkUserProvider) {
            return response.json({ error: 'User is not a provider' });
        }

        const { date } = request.query;
        const parseDate = parseISO(date);

        const appointmentsDay = await Appointment.findAll({
            where: {
                provider_id: request.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
                },
            },
            order: ['date'],
        });

        return response.json(appointmentsDay);
    }
}

export default new ScheduleController();
