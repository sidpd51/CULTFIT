import { classTypeDto } from "../dto/classType.dto";
import { createClassType } from "../repositories/classType.repository";

export const createClassTypeService = async (payload: classTypeDto) => {
    try {
        const classType = await createClassType(payload);
        return classType;
    } catch (error) {
        throw error;
    }
}