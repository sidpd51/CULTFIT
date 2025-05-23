import { classTypeDto } from "../dto/classType.dto";
import { ClassType } from "../models/classType.model"
import { InternalServerError } from "../utils/errors/app.error"

export const createClassType = async (payload: classTypeDto) => {
    try {
        const classType = await ClassType.create(payload);
        return classType;
    } catch (error) {
        throw new InternalServerError("Something went wrong while creating class types")
    }
}