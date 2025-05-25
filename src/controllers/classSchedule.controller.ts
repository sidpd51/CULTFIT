import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";
import { createClassScheduleService, fetchCenterClassSchedulesService } from "../services/classSchedule.service";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";

export const createClassScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createClassScheduleService(req.body);
        logger.info("Class Scheduled successfully through createClassScheduleHandler");
        res.status(StatusCodes.OK).json({
            message: `Class Scheduled successfully for center id: ${req.body.centerId}`,
            success: true,
            data: result
        });
    } catch (error) {
        console.log(error);
        if (error instanceof BadRequestError) {
            logger.error(`Error in createClassScheduleHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        };
        if (error instanceof InternalServerError) {
            logger.error(`Error in createClassScheduleHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        };
    }
}

export const fetchCenterClassSchedulesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const centerId: number = Number(req.params.id);
        if (!centerId) {
            throw new BadRequestError("Center id should be a number");
        }
        const classSchedules = await fetchCenterClassSchedulesService(centerId);
        logger.info(`Successfully got class Schedules associated with the center id: ${centerId} through fetchCenterClassSchedulesHandler`);
        res.status(StatusCodes.OK).json({
            message: `Successfully got class Schedules associated with the center id: ${centerId}`,
            success: true,
            data: classSchedules
        });
    } catch (error) {
        if (error instanceof BadRequestError) {
            logger.error(`Error in fetchCenterClassSchedulesHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof InternalServerError) {
            logger.error(`Error in fetchCenterClassSchedulesHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
    }
}