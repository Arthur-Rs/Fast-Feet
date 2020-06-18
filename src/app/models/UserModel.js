import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (_User) => {
      if (_User.password) {
        _User.password_hash = await hash(_User.password, 8);
      }
    });

    return this;
  }

  ComparePassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
