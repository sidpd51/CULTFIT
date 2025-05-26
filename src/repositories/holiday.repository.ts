import { ForeignKeyConstraintError, Op, UniqueConstraintError, ValidationError } from "sequelize";
import { createHolidayDto } from "../dto/holiday.dto";
import { Holiday } from "../models/holiday.model";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";

export const createHoliday = async (holiday: createHolidayDto) => {
    try {
        const newHoliday = await Holiday.create(holiday);
        return newHoliday
    } catch (error) {
        console.log(error)
        if (error instanceof UniqueConstraintError) {
            throw new BadRequestError(`A Holiday in same day exists for center with id: ${holiday.centerId}`);
        }
        if (error instanceof ValidationError) {
            const messages = error.errors.map((err) => err.message.split('.')[1]);
            throw new BadRequestError(messages.join(", "));
        }
        if (error instanceof ForeignKeyConstraintError) {
            throw new NotFoundError(`Center with id ${holiday.centerId} does not exist.`);
        }
        throw new InternalServerError("Error creating center holiday");
    }
}

export const destroyHoliday = async (holidayId: number) => {
    try {
        const deletedCenter = await Holiday.destroy({
            where: {
                id: holidayId
            }
        });
        if (!deletedCenter) {
            throw new NotFoundError("Center holiday not found");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new InternalServerError("Something went wrong while deleting center holiday");
    }
}

export const fetchHolidayDates = async (centerId: number, currentDate: Date) => {
    try {
        const holidays = await Holiday.findAll({
            where: {
                date: {
                    [Op.gt]: currentDate
                },
                centerId
            },
            attributes: ['date']
        });
        const holidayDates = holidays.map(e=> new Date(e.date).toISOString().split('T')[0]);
        return holidayDates;

    } catch (error) {
        throw new InternalServerError("Something went wrong while fetching holiday");
    }
}