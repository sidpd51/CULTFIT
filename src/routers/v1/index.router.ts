import express from 'express';
import { validateRequestBody } from '../../validators';
import { createUserSchema, signInSchema } from '../../validators/user.validator';
import { signInHandler, signUpHandler } from '../../controllers/user.controller';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { isAdminMiddleware } from '../../middlewares/isAdmin.middleware';
import centerRouter from './center.router';

const v1Router = express.Router();

v1Router.post('/signup', validateRequestBody(createUserSchema), signUpHandler);
v1Router.post('/signin', validateRequestBody(signInSchema), signInHandler);

v1Router.use('/centers', centerRouter);
v1Router.use(authenticateMiddleware);
v1Router.use(isAdminMiddleware);

export default v1Router;