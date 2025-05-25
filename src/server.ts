import express from 'express';
import { serverConfig } from './config';
import { logger } from './config/logger.config';
import sequelize from './config/sequelize';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { appErrorHandler } from './middlewares/error.middleware';
import v1Router from './routers/v1/index.router';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { classInstanceQueue } from './jobs/queues/class-instance-queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [new BullMQAdapter(classInstanceQueue)],
    serverAdapter,
});

const app = express();
app.use(express.json());
app.use("/admin/queues", serverAdapter.getRouter());


const PORT: number = serverConfig.PORT;

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use(appErrorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true });
    // await Role.create({name:'user'});
    // await User.destroy({ where: {}, force: true });
    // await sequelize.sync({ alter: true });
    logger.info('Database connection has been established successfully!');
    console.log(`For the UI, open http://localhost:${PORT}/admin/queues`);
    console.log("Make sure Redis is running on port 6379 with authentication.");
});