import express from 'express';
import { createClassTypeHandler } from '../../controllers/classType.controller';

const classTypeRouter = express.Router();

classTypeRouter.post('/', createClassTypeHandler);

export default classTypeRouter;