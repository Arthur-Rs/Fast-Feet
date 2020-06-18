import { Router } from 'express';

// ==== Controllers ==== \\
import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import RecipientController from '../app/controllers/RecipientController';

// ==== Middlewares ==== \\
import ExistingEmailMd from '../app/middlewares/ExistingEmailMd';
import IsAuthenticationMd from '../app/middlewares/IsAuthenticationMd';

const route = Router();

// ==== Public Routes ==== \\

route.post('/user', ExistingEmailMd, UserController.store);

route.post('/session', SessionController.store);

// ==== Privates Routes ==== \\

route.use(IsAuthenticationMd);

// User
route.get('/user', UserController.index);
route.put('/user', ExistingEmailMd, UserController.update);
route.delete('/user', UserController.delete);

// recipients

route.get('/recipient', () => {});
route.post('/recipient', RecipientController.store);

route.put('/recipient', () => {});
route.delete('/recipient', () => {});

export default route;
