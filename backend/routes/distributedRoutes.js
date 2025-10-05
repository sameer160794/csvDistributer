import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDistributedLists } from "../controllers/distributedController.js";

const router = express.Router();

// Admin can view all lists
router.get("/all", protect, getDistributedLists); // optional: add admin check inside controller

// Agent can view only their lists
router.get("/me", protect, async (req, res, next) => {
  try {
    const lists = await getDistributedListsForUser(req.user._id);
    res.status(200).json(lists);
  } catch (err) {
    next(err);
  }
});

export default router;
