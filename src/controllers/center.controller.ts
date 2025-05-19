import { Request, Response, NextFunction } from "express";
import { createCenterService } from "../services/center.service";
import { logger } from "../config/logger.config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, InternalServerError } from "../utils/errors/app.error";

export const createCenterHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createCenterService(req.body);
        logger.info("Center created successfully");
        res.status(StatusCodes.CREATED).json({
            message: "Center created successfully",
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