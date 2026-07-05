import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ApiError } from "../errors/ApiError";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Maximum file size is 5 MB."
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};