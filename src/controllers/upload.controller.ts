import { Request, Response } from "express";
import { DriveService } from "../services/drive.service";

const driveService = new DriveService();

export const uploadImage = async (
    req: Request,
    res: Response
) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded."
            });
        }

        const image = await driveService.uploadFile(req.file);

        return res.status(201).json({
            success: true,
            data: image
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Image upload failed."
        });

    }

};