import Jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Settings from '../../settings/authentication';

export default async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "You Aren't Allowed!" });
  }

  const [, token] = auth.split(' ');

  try {
    const tokenDecod = await promisify(Jwt.verify)(token, Settings.secret);

    req.id = tokenDecod.id;

    return next();
  } catch {
    return res.status(401).json({ message: "You Aren't Allowed!" });
  }
};
