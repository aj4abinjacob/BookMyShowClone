const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

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

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ message: "Failed to authenticate token" });
        }

        console.log("Token verified successfully:", decoded);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        req.userId = decoded.id;


        next();
    });
}

const verifyAdmin = (req, res, next) => {

    console.log("Verifying admin...");

    console.log("Request user:", req.user);

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Require admin role" });
    }
    console.log("Admin verified successfully");
    
    next();

}

const verifyAdminOrPartner = (req, res, next) => {
    console.log("Verifying admin or partner...");
    console.log("Request user:", req.user);
    console.log("Request user role:", req.user.role);

    if (req.user.role !== "partner" && req.user.role !== "admin") {
        return res.status(403).json({ message: "Require admin or partner role" });
    }

    console.log("Admin or partner verified successfully");
    next();
}



module.exports = {
    verifyToken,
    verifyAdmin,
    verifyAdminOrPartner
}