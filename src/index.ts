import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use("/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});