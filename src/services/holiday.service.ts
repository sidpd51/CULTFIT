import { createHolidayDto } from "../dto/holiday.dto";
import { createHoliday, destroyHoliday } from "../repositories/holiday.repository";

export const createHolidayService = async (holiday: createHolidayDto) => {
    try {
        const newHoliday = await createHoliday(holiday);
        return newHoliday
    } catch (error) {
        throw error
    }
}

export const destroyHolidayService = async (holidayId: number) => {
    try {
        await destroyHoliday(holidayId);
    } catch (error) {
        throw error
    }
}