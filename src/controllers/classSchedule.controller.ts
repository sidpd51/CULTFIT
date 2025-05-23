import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createClassSchedule } from "../repositories/classSchedule.repository";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";
import { logger } from "../config/logger.config";

export const createClassScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createClassSchedule(req.body);

        res.status(StatusCodes.OK).json({
            data: result
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