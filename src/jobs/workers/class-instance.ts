import { Worker } from "bullmq";
import { redisConnection } from "../../config";
import { logger } from "../../config/logger.config";
import sequelize from "../../config/sequelize";
import { createClassInstance } from "../../repositories/classInstance.repository";

(async () => {
    await sequelize.authenticate();
})()

const classInstanceWorker = new Worker("class-instance-queue", async (job) => {
    await createClassInstance(job.data);
}, { connection: redisConnection, concurrency: 10 }
);

classInstanceWorker.on('completed', (job) => {
    logger.info(`🎉 Job ${job.id} completed`);
});

classInstanceWorker.on('failed', (job, err) => {
    logger.info(`❌ Job ${job?.id} failed: ${err.message}`);
});

