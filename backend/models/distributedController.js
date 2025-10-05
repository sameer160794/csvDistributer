import DistributedList from "../models/distributedModel.js";
import User from "../models/userModel.js";

// Get all distributed lists (admin only)
export const getDistributedLists = async (req, res, next) => {
  try {
    const lists = await DistributedList.find().populate("agent", "name email");
    res.json(lists);
  } catch (err) {
    next(err);
  }
};

// Get lists for a single agent
export const getAgentLists = async (req, res, next) => {
  try {
    const lists = await DistributedList.find({ agent: req.user._id });
    res.json(lists);
  } catch (err) {
    next(err);
  }
};
