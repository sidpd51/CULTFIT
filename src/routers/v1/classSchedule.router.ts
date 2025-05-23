import express from 'express';
import { createClassScheduleHandler } from '../../controllers/classSchedule.controller';

const classScheduleRouter = express.Router();

classScheduleRouter.post('/', createClassScheduleHandler);

export default classScheduleRouter;