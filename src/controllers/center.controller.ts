import { Request, Response, NextFunction } from "express";
import { createCenterService, updateCenterService } from "../services/center.service";
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

export const updateCenterHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const centerId: number = Number(req.params.id);
        if(!centerId){
            throw new BadRequestError("Center id should be a number");
        }
        const center = await updateCenterService(centerId, req.body);
        res.status(StatusCodes.OK).json({
            message: "Center updated successfully",
            success: true,
            data: center
        });
    } catch (error) {
        if (error instanceof BadRequestError) {
            logger.error(`Error in updateCenterHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
        if (error instanceof InternalServerError) {
            logger.error(`Error in updateCenterHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            });
        }
    }
}