import * as Yup from 'yup';
import UserModel from '../models/UserModel';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(2).max(48).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(32).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Body!' });
    }

    await UserModel.create(req.body).catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    return res.json({ message: 'Success!' });
  }

  async index(req, res) {
    const { id } = req;

    const data = await UserModel.findOne({ where: { id } }).catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    const filterData = { name: data.name, email: data.email };

    return res.json(filterData);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(2).max(48),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPass, field) =>
        oldPass ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Body!' });
    }

    const { oldPassword } = req.body;
    const user = await UserModel.findByPk(req.id);

    if (oldPassword && !(await user.ComparePassword(oldPassword))) {
      return res.status(401).json({ message: 'Incorrect Password!' });
    }

    await user.update(req.body).catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    return res.json({ message: 'Updated User!' });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().min(6).max(32).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Body!' });
    }

    const { id } = req;

    const user = await UserModel.findByPk(id).catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    if (!(await user.ComparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Incorrect Password!' });
    }

    await user.destroy().catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    return res.send({ message: 'User Deleted!' });
  }
}

export default new UserController();
