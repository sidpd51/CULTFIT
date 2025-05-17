import { createUserDto } from "../dto/user.dto";
import { createUser } from "../repositories/user.repository";

export const createUserService = async (user: createUserDto) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        throw error
    }
}