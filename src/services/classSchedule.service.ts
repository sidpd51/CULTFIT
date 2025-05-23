import { classScheduleType } from "../dto/classSchedule.dto";
import { createClassSchedule, fetchCenterClassSchedules } from "../repositories/classSchedule.repository";

export const createClassScheduleService = async (payload: classScheduleType) => {
    try {
        const classSchedule = await createClassSchedule(payload);
        return classSchedule;
    } catch (error) {
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