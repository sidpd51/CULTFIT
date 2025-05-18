import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { isAdminService } from "../services/user.service";

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rawEmail = req.headers["x-email"];
        const email = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail;
        if (email) {
            const result = await isAdminService(email);
            if (result) {
                next()
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "You are not authorized to access this resource.",
                    success: false,
                    data: {}
                });
            }
        }
    } catch (error) {
        if (error instanceof InternalServerError) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
    }
}