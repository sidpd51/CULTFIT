import { UniqueConstraintError, ValidationError } from "sequelize";

import { createUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";

export const createUser = async (user: createUserDto) => {
    try {
        const newUser = await User.create(user);
        const { password, ...withNoPassword } = newUser.dataValues;
        return withNoPassword;
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new BadRequestError("A user with same email exist.");
        }
        if (error instanceof ValidationError) {
            const messages = error.errors.map((err) => err.message.split('.')[1]);
            throw new BadRequestError(messages.join(", "));
        }
        throw new InternalServerError("Error creating user");
    }
};