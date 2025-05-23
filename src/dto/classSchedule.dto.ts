export type classScheduleType = {
    centerId: number;
    classTypeId: number;
    isRecurring?: boolean;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    days: number[]
}