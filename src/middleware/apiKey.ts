import { Request, Response, NextFunction } from "express";



export const validateApiKey = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const apiKey = req.header("x-api-key");

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "API Key is required."
        });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            success: false,
            message: "Invalid API Key."
        });
    }

    next();
};