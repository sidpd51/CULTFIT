import express from 'express';
import { createClassScheduleHandler, fetchCenterClassSchedulesHandler } from '../../controllers/classSchedule.controller';
import { validateRequestBody } from '../../validators';
import { createClassScheduleSchema } from '../../validators/classSchedule.validator';

const classScheduleRouter = express.Router();

classScheduleRouter.post('/', validateRequestBody(createClassScheduleSchema), createClassScheduleHandler);
classScheduleRouter.get('/:id', fetchCenterClassSchedulesHandler);

export default classScheduleRouter;