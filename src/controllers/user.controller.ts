import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";
import { createUserService } from "../services/user.service";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";


export const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUserService(req.body);
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            success: true,
            data: user
        });

    } catch (error) {
        if (error instanceof BadRequestError) {
            logger.error(`Error in signUpHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        };
        if (error instanceof InternalServerError) {
            logger.error(`Error in signUpHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        };
    }
}