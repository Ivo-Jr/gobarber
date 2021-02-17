import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    // Relacionamento com a tab. users e a tab. files para add a coluna 'avatar_id'
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id' });
    }

    // Salvando a referencia de um id de arquivo dentro da tabela de usuários
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
