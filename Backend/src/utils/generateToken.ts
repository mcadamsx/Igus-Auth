import * as  jwt from "jsonwebtoken";

export const generateToken = (userId: string, userRole:string) => {
    return jwt.sign({ userId, userRole }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
