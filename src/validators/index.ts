import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject, ZodError } from "zod";

export const validateRequestBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync(req.body);
            req.body = parsed;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid request body",
                    success: false,
                    error: err.issues.map((issue: any) => {
                        return `${issue.message}, field: ${issue.path.join("")}`
                    })
                })
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Unexpected validation error",
                    success: false,
                });
            }
        }
    }
}