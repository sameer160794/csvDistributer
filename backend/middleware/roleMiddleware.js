// backend/middleware/roleMiddleware.js

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export const agentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "agent") {
    return res.status(403).json({ message: "Access denied: Agents only" });
  }
  next();
};
