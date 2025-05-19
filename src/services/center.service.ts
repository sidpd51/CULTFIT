import { createCenterDto } from "../dto/center.dto";
import { createCenter } from "../repositories/center.repository";

export const createCenterService = async (user: createCenterDto) => {
    try {
        const newUser = await createCenter(user);
        return newUser;
    } catch (error) {
        throw error
    }
}