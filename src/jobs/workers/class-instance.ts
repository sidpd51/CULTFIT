import { Worker } from "bullmq";
import { redisConnection } from "../../config";
import { createClassInstance } from "../../repositories/classInstance.repository";
import { logger } from "../../config/logger.config";


export const classInstanceWorker = new Worker("class-instance-queue", async (job) => {
    await createClassInstance(job.data);
}, { connection: redisConnection, concurrency: 10 }
);


classInstanceWorker.on('completed', (job) => {
    logger.info(`🎉 Job ${job.id} completed`)
});

classInstanceWorker.on('failed', (job, err) => {
    logger.info(`❌ Job ${job?.id} failed: ${err.message}`)
});

