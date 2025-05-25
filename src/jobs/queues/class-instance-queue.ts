import { Queue } from "bullmq";
import { redisConnection } from "../../config";


export const classInstanceQueue = new Queue("class-instance-queue", { connection: redisConnection });
