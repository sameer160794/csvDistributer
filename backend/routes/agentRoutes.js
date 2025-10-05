import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js"; // correct named import
import { createAgent, getAgents } from "../controllers/agentController.js"; // must match exported names

const router = express.Router();

router.post("/", protect, adminOnly, createAgent);
router.get("/", protect, adminOnly, getAgents);

export default router; // default export is correct
