// Este aquivo criará a conexão com o banco de dados dentro do config/database e carregará todos os models da aplicação
import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
    constructor() {
        this.init();
    }

    // O metodo init() fará a conexão com o banco de dados e exporta os models.
    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
