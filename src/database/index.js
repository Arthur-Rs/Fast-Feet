import Sequelize from 'sequelize';
import Settings from '../settings/database';

// ==== Models ==== \\
import UserModel from '../app/models/UserModel';
import RecipientModel from '../app/models/RecipientModel';

const Models = [UserModel, RecipientModel];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(Settings);

    Models.map((model) => model.init(this.connection));
  }
}

export default new Database();
