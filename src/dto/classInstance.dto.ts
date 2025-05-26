import { ClassInstanceStatus } from "../models/classInstance.model";

export type ClassInstanceDto = {
    classScheduleId: number;
    centerId: number;
    classTypeId: number;
    date: Date;
    startTime: string;
    status: ClassInstanceStatus;
}