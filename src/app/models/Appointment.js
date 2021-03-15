import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // Quando existe dois relacionamento de uma tabela com outra, é necessário passar o apelido: ("as: 'apelido'")
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}

export default Appointment;
