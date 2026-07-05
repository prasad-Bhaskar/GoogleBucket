import { Request, Response } from "express";
import { oauth2Client } from "../config/google";

export const login = (_req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/drive.file"
    ]
  });

  res.redirect(url);
};

export const callback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is missing."
      });
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log("=================================");
    console.log("Refresh Token:");
    console.log(tokens.refresh_token);
    console.log("=================================");

    res.json({
      success: true,
      message: "Authorization successful. Copy the refresh token from the console.",
      tokens
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to authenticate with Google."
    });
  }
};