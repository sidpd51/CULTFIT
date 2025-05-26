import { classScheduleDto } from "../dto/classSchedule.dto";
import { classInstanceQueue } from "../jobs/queues/class-instance-queue";
import { ClassInstanceStatus } from "../models/classInstance.model";
import { ClassSchedule } from "../models/classSchedule.model";
import { createClassInstance } from "../repositories/classInstance.repository";
import { createClassSchedule, fetchCenterClassSchedules } from "../repositories/classSchedule.repository";
import { fetchHolidayDates } from "../repositories/holiday.repository";
import { BadRequestError } from "../utils/errors/app.error";

export const createClassScheduleService = async (payload: classScheduleDto) => {
    try {
        const startDate = new Date(payload.startDate);
        const endDate = new Date(payload.endDate);
        const currentDate = new Date();
        if (currentDate > startDate) {
            throw new BadRequestError("startDate must be in the future.");
        }
        if (startDate > endDate) {
            throw new BadRequestError("startDate can't be before endDate");
        }
        const classSchedule = await createClassSchedule(payload);
        //add days
        payload.days.forEach(day => {
            classSchedule.addDay(day);
        });

        if (!classSchedule.isRecurring) {
            await createClassInstance({
                classScheduleId: classSchedule.id,
                centerId: classSchedule.centerId,
                classTypeId: classSchedule.classTypeId,
                date: classSchedule.startDate,
                startTime: classSchedule.startTime,
                status: ClassInstanceStatus.SCHEDULED
            });
        }
        //fire and forget
        (async () => {
            try {

                const holidays = await fetchHolidayDates(classSchedule.centerId, currentDate);
                const dates = getMatchingDatesExcludingHolidays(payload.startDate, payload.endDate, payload.days, holidays);
                dates.forEach((date) => {
                    AddClassInstanceToQueue(classSchedule, date);
                });
            } catch (error) {
                console.error("Error in background processing:", error);
            }
        })();
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

const AddClassInstanceToQueue = async (classSchedule: ClassSchedule, date: string) => {
    try {

        await classInstanceQueue.add("class-instance-queue", {
            classScheduleId: classSchedule.id,
            centerId: classSchedule.centerId,
            classTypeId: classSchedule.classTypeId,
            date: date,
            startTime: classSchedule.startTime,
            status: ClassInstanceStatus.SCHEDULED,
        }, {
            removeOnComplete: 1000,
            removeOnFail: 5000,
        });
    } catch (error) {
        console.log("Error from AddClassInstanceToQueue:", error)
    }
}

function getMatchingDatesExcludingHolidays(
    startDateStr: string,
    endDateStr: string,
    daysOfWeek: number[],
    holidayDates: string[]
): string[] {
    const matchingDates: Date[] = [];
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const targetWeekdays = new Set(daysOfWeek.map(day => day % 7));
    let iteratingDate = new Date(startDate);

    while (iteratingDate <= endDate) {
        if (targetWeekdays.has(iteratingDate.getDay())) {
            matchingDates.push(new Date(iteratingDate));
        }
        iteratingDate.setDate(iteratingDate.getDate() + 1);
    }

    const matchedDateStrings = matchingDates.map(d =>
        d.toISOString().split('T')[0]
    );

    // Filter out holidays
    const validDates = matchedDateStrings.filter(dateStr => !holidayDates.includes(dateStr));
    return validDates;
}
