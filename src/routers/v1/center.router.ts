import express from 'express';
import { createCenterHandler, destroyCenterHandler, updateCenterHandler } from '../../controllers/center.controller';
import { validateRequestBody } from '../../validators';
import { createCenterSchema, updateCenterSchema } from '../../validators/center.validator';

const centerRouter = express.Router();

centerRouter.post('/', validateRequestBody(createCenterSchema), createCenterHandler);
centerRouter.patch('/:id', validateRequestBody(updateCenterSchema), updateCenterHandler);
centerRouter.delete('/:id', destroyCenterHandler);

export default centerRouter;