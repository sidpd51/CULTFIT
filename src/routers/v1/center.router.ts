import express from 'express';
import { createCenterHandler, destroyCenterHandler, getAllCentersHandler, getCenterByIdHandler, updateCenterHandler } from '../../controllers/center.controller';
import { validateRequestBody } from '../../validators';
import { createCenterSchema, updateCenterSchema } from '../../validators/center.validator';

const centerRouter = express.Router();

centerRouter.post('/', validateRequestBody(createCenterSchema), createCenterHandler);
centerRouter.get('/', getAllCentersHandler);
centerRouter.get('/:id', getCenterByIdHandler);
centerRouter.patch('/:id', validateRequestBody(updateCenterSchema), updateCenterHandler);
centerRouter.delete('/:id', destroyCenterHandler);

export default centerRouter;