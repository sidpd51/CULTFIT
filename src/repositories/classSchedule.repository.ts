import { ValidationError } from "sequelize";
import { ClassSchedule } from "../models/classSchedule.model";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";
import { classScheduleDto } from "../dto/classSchedule.dto";


export const createClassSchedule = async (payload: classScheduleDto) => {
    try {
        const classSchedule = await ClassSchedule.create(payload);
        return classSchedule;
    } catch (error) {
        if (error instanceof ValidationError) {
            const messages = error.errors.map((err) => err.message.split('.')[1]);
            throw new BadRequestError(messages.join(", "));
        }
        throw new InternalServerError("Error creating classSchedule");
    }
}

export const fetchCenterClassSchedules = async (centerId: number) => {
    try {
        const classSchedules = await ClassSchedule.findAll({
            where: {
                centerId: centerId
            }
        });
        return classSchedules;
    } catch (error) {
        throw new InternalServerError("Something went wrong while getting classSchedules");
    }
}