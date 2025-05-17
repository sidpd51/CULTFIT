import express from 'express';
import { validateRequetBody } from '../../validators';
import { createUserSchema } from '../../validators/user.validator';
import { signUpHandler } from '../../controllers/user.controller';

const v1Router = express.Router();

v1Router.post('/signup', validateRequetBody(createUserSchema), signUpHandler);

export default v1Router;