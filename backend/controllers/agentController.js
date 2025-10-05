import User from "../models/userModel.js";

// Create a new agent (admin only)
export const createAgent = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Check if agent already exists
    const agentExists = await User.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Create agent with role "agent"
    const agent = await User.create({
      email,
      password,
      role: "agent",
      name,    // optional, add name field in User model if needed
      mobile,  // optional, add mobile field in User model if needed
    });

    res.status(201).json({
      message: "Agent created successfully",
      agent: { id: agent._id, email: agent.email, role: agent.role, name, mobile },
    });
  } catch (error) {
    next(error);
  }
};

// Get all agents (admin only)
export const getAgents = async (req, res, next) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (error) {
    next(error);
  }
};
