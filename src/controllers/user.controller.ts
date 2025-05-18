import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";
import { createUserService, signInService } from "../services/user.service";
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";

export const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUserService(req.body);
        logger.info(`Successfully created user with name: ${user.name}.`);
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

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const token = await signInService(body);
        logger.info(`Successfully logged in!`);
        res.status(StatusCodes.CREATED).json({
            message: "Token created successfully",
            success: true,
            data: {
                token: token
            }
        });

    } catch (error) {
        if (error instanceof UnauthorizedError) {
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

