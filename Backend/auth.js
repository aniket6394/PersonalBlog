const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function authMiddleware(req, res, next) {
  // 1️⃣ Get Authorization header
  const authHeader = req.headers.authorization;

  // ❌ No token sent
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2️⃣ Extract token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, SECRET);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Allow request to continue
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
