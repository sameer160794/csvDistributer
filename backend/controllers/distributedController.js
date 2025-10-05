import DistributedList from "../models/distributedModel.js";
import User from "../models/userModel.js";

export const getDistributedLists = async (req, res, next) => {
  try {
    const lists = await DistributedList.find().populate("agent", "name email");
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};

// Helper for agent
export const getDistributedListsForUser = async (userId) => {
  return DistributedList.find({ agent: userId }).populate("agent", "name email");
};
