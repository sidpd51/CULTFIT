import { createUserDto, signInDto } from "../dto/user.dto";
import { createUser, getUserByEmail, isAdmin } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import { InternalServerError, UnauthorizedError } from "../utils/errors/app.error";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { serverConfig } from "../config";

export const createUserService = async (user: createUserDto) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        throw error
    }
}

const createToken = async (user: signInDto) => {
    try {
        const token = jwt.sign(user, serverConfig.JWT_KEY, {
            expiresIn: '1h'
        });
        return token;
    } catch (error) {
        throw new InternalServerError("Something went wrong while creating auth token");
    }
}

const checkPassword = async (plainPassword: string, encryptedPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, encryptedPassword);
    } catch (error) {
        throw new InternalServerError("Something went wrong while checking password");
    }
}

export const signInService = async (payload: signInDto) => {
    try {
        const user = await getUserByEmail(payload.email);
        const hashPassword = user.password;
        const result = await checkPassword(payload.password, hashPassword);
        if (!result) {
            throw new UnauthorizedError("Invalid email or password");
        } else {
            return await createToken(payload);
        }
    } catch (error) {
        throw error;
    }
}

export const verifyToken = async (token: string | undefined) => {
    try {
        if (!token) {
            throw new UnauthorizedError("Missing auth token");
        }
        const response = jwt.verify(token, serverConfig.JWT_KEY)
        return response;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new UnauthorizedError(error.message);
        }
    }
}

export const isAdminService = async (email: string) => {
    try {
        if (!email) {
            throw new InternalServerError("Something went wrong while getting user");
        }
        return await isAdmin(email);
    } catch (error) {
        throw error;
    }
}