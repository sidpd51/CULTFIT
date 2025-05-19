import express from 'express';
import { createCenterHandler } from '../../controllers/center.controller';

const centerRouter = express.Router();

centerRouter.post('/', createCenterHandler);

export default centerRouter;