import { drive } from "../config/google";
import streamifier from "streamifier";

export class DriveService {

    async uploadFile(file: Express.Multer.File) {

        // Upload file
        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}-${file.originalname}`,
                mimeType: file.mimetype
            },
            media: {
                mimeType: file.mimetype,
                body: streamifier.createReadStream(file.buffer)
            },
            fields: "id,name"
        });

        const fileId = response.data.id!;

        // Make file public
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });

        // Return file metadata
        const result = await drive.files.get({
            fileId,
            fields: "id,name,webViewLink,webContentLink"
        });

        return {
            id: result.data.id,
            name: result.data.name,
            webViewLink: result.data.webViewLink,
            webContentLink: result.data.webContentLink,
            publicUrl: `https://drive.google.com/uc?id=${fileId}`
        };
    }

}