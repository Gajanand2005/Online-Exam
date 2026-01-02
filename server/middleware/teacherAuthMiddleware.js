import jwt from "jsonwebtoken";

export const protectTeacher = (req, res, next) => {
  try {
    // ✅ header kisi bhi case me ho
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    console.log("AUTH HEADER =>", authHeader); // debug

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // ✅ Bearer ho ya na ho, token nikal lo
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.teacher = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
