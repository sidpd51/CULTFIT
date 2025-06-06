import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../utils/errors/app.error";
import { signInDto } from "../dto/user.dto";
import { verifyToken } from "../services/user.service";

export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Access token missing',
                success: false,
                data: {}
            });
        }
        const decoded = await verifyToken(token) as signInDto;
        req.headers["x-email"] = decoded.email;
        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            res.status(error.statusCode).json({
                message: 'Invalid or expired token',
                success: false,
                data: {}
            });
        }
    }
}