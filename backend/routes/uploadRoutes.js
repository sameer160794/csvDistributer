import express from "express";
import multer from "multer";
import { uploadAndDistributeMultiple } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route for multiple file upload (admin only)
router.post(
  "/multiple",
  protect,
  adminOnly,
  upload.array("files", 10), // max 10 files
  uploadAndDistributeMultiple
);

export default router; // default export

