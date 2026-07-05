import { Request, Response, NextFunction } from "express";
import { DriveService } from "../services/drive.service";

const driveService = new DriveService();

export const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const image = await driveService.uploadFile(req.file!);

        res.status(201).json({
            success: true,
            data: image
        });

    } catch (err) {
        next(err);
    }

};