import express from 'express';
import { validateRequetBody } from '../../validators';
import { createUserSchema, signInSchema } from '../../validators/user.validator';
import { signInHandler, signUpHandler } from '../../controllers/user.controller';

const v1Router = express.Router();

v1Router.post('/signup', validateRequetBody(createUserSchema), signUpHandler);
v1Router.post('/signin', validateRequetBody(signInSchema), signInHandler);

export default v1Router;