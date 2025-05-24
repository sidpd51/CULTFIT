import { ClassInstanceDto } from "../dto/classInstance.dto";
import { ClassInstance } from "../models/classInstance.model";
import { InternalServerError } from "../utils/errors/app.error";

export const createClassInstance = async (payload: ClassInstanceDto) => {
    try {
        const classInstance = await ClassInstance.create(payload);
        return classInstance;
    } catch (error) {
        console.log(error)
        throw new InternalServerError("Something went wrong while creating class instance");
    }
}