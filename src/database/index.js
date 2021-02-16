// Este aquivo criará a conexão com o banco de dados dentro do config/database e carregará todos os models da aplicação
import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();

  }

  // O metodo init() fará a conexão com o banco de daods e exporta os models.
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
