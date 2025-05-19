import express from 'express';
import { createCenterHandler, updateCenterHandler } from '../../controllers/center.controller';
import { validateRequestBody } from '../../validators';
import { createCenterSchema, updateCenterSchema } from '../../validators/center.validator';

const centerRouter = express.Router();

centerRouter.post('/', validateRequestBody(createCenterSchema), createCenterHandler);
centerRouter.patch('/:id', validateRequestBody(updateCenterSchema), updateCenterHandler);

export default centerRouter;