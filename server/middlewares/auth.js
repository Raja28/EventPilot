const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found."
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT secret not configured"
            });
        }

        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = tokenData;
            next();

        } catch (error) {
            let message = "Invalid or expired token";
            if (error.name === "TokenExpiredError") {
                message = "Token has expired";
            } else if (error.name === "JsonWebTokenError") {
                message = "Invalid token";
            }
            return res.status(401).json({
                success: false,
                message
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Error validating token"
        });
    }
};