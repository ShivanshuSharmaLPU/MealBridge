import jwt from "jsonwebtoken";

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
    // Make sure token header is correctly read (case-insensitive)
    const token = req.headers["token"] || req.headers["Token"] || req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. Please log in again"
        });
    }

    try {
        // Verify token using secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request body for further use
        req.body.userId = decoded.id;

        next(); // proceed
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authMiddleware;