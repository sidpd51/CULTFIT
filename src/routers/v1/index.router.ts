import express from 'express';
import { validateRequestBody } from '../../validators';
import { createUserSchema, signInSchema } from '../../validators/user.validator';
import { signInHandler, signUpHandler } from '../../controllers/user.controller';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { isAdminMiddleware } from '../../middlewares/isAdmin.middleware';
import centerRouter from './center.router';
import holidayRouter from './holiday.router';
import classScheduleRouter from './classSchedule.router';
import classTypeRouter from './classType.router';
import { createClassScheduleSchema } from '../../validators/classSchedule.validator';

const v1Router = express.Router();

v1Router.post('/signup', validateRequestBody(createUserSchema), signUpHandler);
v1Router.post('/signin', validateRequestBody(signInSchema), signInHandler);

v1Router.use('/centers', centerRouter);
v1Router.use('/holidays', holidayRouter);
v1Router.use('/classes', validateRequestBody(createClassScheduleSchema), classScheduleRouter);
v1Router.use('/classtypes', classTypeRouter);

v1Router.use(authenticateMiddleware);
v1Router.use(isAdminMiddleware);

export default v1Router;