import express from 'express';
import { serverConfig } from './config';
import { logger } from './config/logger.config';
import sequelize from './config/sequelize';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { appErrorHandler } from './middlewares/error.middleware';
import v1Router from './routers/v1/index.router';

const app = express();
app.use(express.json());

const PORT: number = serverConfig.PORT;

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use(appErrorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    // await Role.create({name:'user'});
    // await User.destroy({ where: {}, force: true });
    await sequelize.sync({ alter: true });
    logger.info('Database connection has been established successfully!');
});