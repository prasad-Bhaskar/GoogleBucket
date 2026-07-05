import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed."));
        }

        cb(null, true);
    }
});