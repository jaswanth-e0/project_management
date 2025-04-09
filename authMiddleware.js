const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_secret_key"); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = verifyToken;
