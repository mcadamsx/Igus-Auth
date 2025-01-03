import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "No token provided" });
        }

        const decoded: any = jwt.decode(token);

        if (!decoded) {
            res.status(403).json({ message: "Invalid or expired token" });
        }
        console.log(token);
        console.log(decoded);

        if (decoded.userRole !== "Admin") {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
