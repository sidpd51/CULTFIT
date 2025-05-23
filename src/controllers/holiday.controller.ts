import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { createHolidayService, destroyHolidayService } from "../services/holiday.service";

export const createHolidayHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createHolidayService(req.body);
        logger.info("Center holiday created successfully");
        res.status(StatusCodes.CREATED).json({
            message: "Center holiday created successfully",
            success: true,
            data: user
        });

    } catch (error) {
        if (error instanceof InternalServerError) {
            logger.error(`Error in createCenterHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof NotFoundError) {
            logger.error(`Error in createCenterHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }

        if (error instanceof BadRequestError) {
            logger.error(`Error in createCenterHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
    }
}

export const destroyHolidayHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const holidayId = Number(req.params.id);
        if (!holidayId) {
            throw new BadRequestError("Center holiday id should be a number");
        }
        await destroyHolidayService(holidayId);
        res.status(StatusCodes.OK).json({
            message: `Center holiday with id ${holidayId} deleted successfully`,
            success: true,
            data: {}
        });

    } catch (error) {
        if (error instanceof InternalServerError) {
            logger.error(`Error in destroyCenterHolidayHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof BadRequestError) {
            logger.error(`Error in destroyCenterHolidayHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof NotFoundError) {
            logger.error(`Error in destroyCenterHolidayHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
    }
}
