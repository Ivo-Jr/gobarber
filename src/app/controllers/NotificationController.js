import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
    async index(request, response) {
        const checkIsProvider = await User.findOne({
            where: { id: request.userId, provider: true },
        });

        if (!checkIsProvider) {
            return response
                .status(401)
                .json({ message: 'Only providers can load notifications' });
        }

        const notification = await Notification.find({
            user: request.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return response.json(notification);
    }

    async update(request, response) {
        const notification = await Notification.findByIdAndUpdate(
            request.params.id,
            { read: true },
            { new: true }
        );

        return response.json(notification);
    }
}

export default new NotificationController();
