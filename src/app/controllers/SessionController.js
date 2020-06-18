import Jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/UserModel';
import Settings from '../../settings/authentication';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Body!' });
    }

    const { email, password } = req.body;

    const UserVerified = await User.findOne({ where: { email } });

    if (!UserVerified) {
      return res.status(400).json({ message: 'Non-existent User!' });
    }

    if (!(await UserVerified.ComparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect Password!' });
    }

    const { id, name } = UserVerified;

    return res.json({
      id,
      name,
      email,
      token: Jwt.sign({ id }, Settings.secret, {
        expiresIn: Settings.expiresIn,
      }),
    });
  }
}

export default new SessionController();
