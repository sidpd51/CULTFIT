import { createCenterDto, udpateCenterDto } from "../dto/center.dto";
import { createCenter, updateCenter } from "../repositories/center.repository";

export const createCenterService = async (user: createCenterDto) => {
    try {
        const newUser = await createCenter(user);
        return newUser;
    } catch (error) {
        throw error
    }
}

export const updateCenterService = async (centerId: number, payload: udpateCenterDto) => {
    try {
        const updatedCenter = await updateCenter(centerId, payload);
        return updatedCenter;
    } catch (error) {
        throw error
    }
}