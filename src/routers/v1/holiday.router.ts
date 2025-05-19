import express from 'express';
import { createHolidayHandler, destroyHolidayHandler } from '../../controllers/holiday.controller';
import { validateRequestBody } from '../../validators';
import { createHolidaySchema } from '../../validators/holiday.validator';


const holidayRouter = express.Router();

holidayRouter.post('/', validateRequestBody(createHolidaySchema), createHolidayHandler);
holidayRouter.delete('/:id', destroyHolidayHandler);

export default holidayRouter;