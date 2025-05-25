import { classScheduleType } from "../dto/classSchedule.dto";
import { classInstanceQueue } from "../jobs/queues/class-instance-queue";
import { ClassInstanceStatus } from "../models/classInstance.model";
import { createClassSchedule, fetchCenterClassSchedules } from "../repositories/classSchedule.repository";

export const createClassScheduleService = async (payload: classScheduleType) => {
    try {
        const classSchedule = await createClassSchedule(payload);
        await pushClassInstanceToQueue(classSchedule.id);

        return classSchedule;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const fetchCenterClassSchedulesService = async (centerId: number) => {
    try {
        const classSchedules = await fetchCenterClassSchedules(centerId);
        return classSchedules;
    } catch (error) {
        throw error;
    }
}

const pushClassInstanceToQueue = async (id: number) => {
    try {

        await classInstanceQueue.add("class-instance-queue", {
            classScheduleId: id,
            centerId: 1,
            classTypeId: 1,
            date: '2025-05-29',
            startTime: '08:45',
            status: ClassInstanceStatus.SCHEDULED,
        }, {
            removeOnComplete: 1000,
            removeOnFail: 5000,
        });
    } catch (error) {
        console.log("From pushClassInstanceToQueue:", error)
    }
}