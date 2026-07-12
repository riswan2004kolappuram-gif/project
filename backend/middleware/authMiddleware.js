import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "  No Token Provided",
      });
    }
 
    const token = authHeader.split(" ")[1];
 
    const decoded = jwt.verify(token, JWT_SECRET);
 
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

export default authMiddleware;