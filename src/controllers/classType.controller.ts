import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createClassTypeService } from "../services/classType.service";

export const createClassTypeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classType = await createClassTypeService(req.body);
        res.status(StatusCodes.OK).json({
            message: "Class Type created successfully",
            success: true,
            data: classType
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}