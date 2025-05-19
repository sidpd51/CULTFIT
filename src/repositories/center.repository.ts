
import { UniqueConstraintError, ValidationError } from "sequelize";
import { Center } from "../models/center.model";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";
import { createCenterDto } from "../dto/center.dto";

export const createCenter = async (center: createCenterDto) => {
    try {
        const newCenter = await Center.create(center);
        return newCenter;
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new BadRequestError("A center with this name already exists.")
        }
        if (error instanceof ValidationError) {
            const messages = error.errors.map((err: { message: string; }) => err.message.split('.')[1]);
            throw new BadRequestError(messages.join(", "));
        }
        throw new InternalServerError("Error creating center");
    }
}