import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadImage } from "../controllers/upload.controller";
import { validateApiKey } from "../middleware/apiKey";

const router = Router();

router.post(
    "/",
    validateApiKey,
    upload.single("image"),
    uploadImage
);

export default router;