import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadImage } from "../controllers/upload.controller";
import { validateApiKey } from "../middleware/apiKey";
import { validateImage } from "../middleware/validateImage";

const router = Router();

router.post(
    "/",
    validateApiKey,
    upload.single("image"),
    validateImage,
    uploadImage
);

export default router;