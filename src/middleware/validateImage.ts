import { Request, Response, NextFunction } from "express";
import { fileTypeFromBuffer } from "file-type";
import { ApiError } from "../errors/ApiError";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

export const validateImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (!req.file) {
            throw new ApiError(400, "Image is required.");
        }

        const fileType = await fileTypeFromBuffer(req.file.buffer);

        if (!fileType) {
            throw new ApiError(400, "Invalid image.");
        }

        if (!allowedMimeTypes.includes(fileType.mime)) {
            throw new ApiError(
                400,
                "Only JPG, PNG, WEBP and GIF images are allowed."
            );
        }

        next();

    } catch (err) {
        next(err);
    }
};