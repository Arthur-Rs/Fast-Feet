import * as Yup from 'yup';
import RecipientModel from '../models/RecipientModel';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      uf: Yup.string().min(2).max(2).uppercase().required(),
      city: Yup.string().min(2).required(),
      street: Yup.string().min(2).required(),
      number: Yup.number().min(2).required(),
      zip_code: Yup.string().min(6),
      complement: Yup.string().max(124),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Body!' });
    }

    await RecipientModel.create(req.body).catch(() => {
      return res.status(500).json({ message: 'Error in database!' });
    });

    return res.json({ message: 'Success!' });
  }
}

export default new RecipientController();
