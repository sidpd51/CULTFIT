import { createHolidayDto } from "../dto/holiday.dto";
import { createHoliday } from "../repositories/holiday.repository";

export const createHolidayService = async (holiday: createHolidayDto) => {
    try {
        const newHoliday = await createHoliday(holiday);
        return newHoliday
    } catch (error) {
        throw error
    }
}