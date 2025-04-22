const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Verifying token...");
    console.log("Request headers:", req.headers);
    
    const tokenString = req.headers["authorization"];
    if (!tokenString) {
        return res.status(403).json({ message: "No token provided" });
    }
    
    const token = tokenString.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ message: "Failed to authenticate token" });
        }

        console.log("Token verified successfully:", decoded);
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken
}