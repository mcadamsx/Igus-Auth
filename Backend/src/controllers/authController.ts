import { NextFunction, Request, Response } from 'express';
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../config/dataSoruce";
import { generateToken } from "../utils/generateToken";
import { UserData } from '../entities/User';
import { Secret } from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';

export const SECRET_KEY: Secret = process.env.JWT_SECRET;


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const { email, password, role } = req.body;

      if (!email || !password) {
         res.status(400).json({ message: "Email and password are required" });
         return;
      }

      const repository = AppDataSource.getRepository(UserData);
      const user = await repository.createQueryBuilder("user")
         .where("user.email = :email", { email })
         .getOne();

      if (user) {
         res.status(400).json({ message: `User with email ${email} already exists` });
         return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = repository.create({
         email,
         password: hashedPassword,
         role,
         createdAt: new Date(),
      });

      await repository.save(newUser);

      res.status(201).json({
         message: "User registered successfully",
         user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
         },
      });
   } catch (err) {
      console.error("Error during registration:", err);
      next(err);
   }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({ message: "Email and password are required" });
         return;
      }

      const repository = AppDataSource.getRepository(UserData);
      const user = await repository.findOne({ where: { email } });

      if (!user) {
         res.status(400).json({ message: "Invalid Credentials" });
         return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
         res.status(400).json({ message: "Invalid Password" });
         return;
      }

      const token = generateToken(user.id, user.role);

      res.status(200).json({
         message: "Login successful",
         user: {
            id: user.id,
            email: user.email,
            role: user.role,
         },
         token,
      });
   } catch (error) {
      console.error("Error during login:", error);
      next(error);
   }
};

export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const { email } = req.body;

      if (!email) {
         res.status(400).json({ message: "Email is required" });
         return;
      }

      const repository = AppDataSource.getRepository(UserData);

      const user = await repository.findOne({ where: { email } });
      if (!user) {
         res.status(404).json({ message: "User with the given email does not exist" });
         return;
      }
  
      const resetToken = generateToken(user.id, user.role); 
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); 
      await repository.save(user);
      res.status(200).json({
         message: "Password reset sucessful",
         resetToken,
      });
   } catch (err) {
      console.error("Error requesting password reset:", err);
      next(err);
   }
};


export const resetPassword = async (
   req: Request,
   res: Response,
   next: NextFunction
 ): Promise<void> => {
   try {
     const { token, newPassword } = req.body;
 
     if (!token || !newPassword) {
       res.status(400).json({ message: "Token and new password are required." });
       return;
     }
 
     const repository = AppDataSource.getRepository(UserData);
 
     let decodedToken;
     try {
       decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
     } catch (err) {
       res.status(400).json({ message: "Invalid or expired reset token." });
       return;
     }
 
     const user = await repository.findOne({ where: { id: decodedToken.id } });
 
     if (!user) {
       res.status(404).json({ message: "User not found." });
       return;
     }
 
     if (user.resetPasswordExpires && new Date(user.resetPasswordExpires) < new Date()) {
       res.status(400).json({ message: "Reset token has expired." });
       return;
     }
 
     // Log and hash the new password
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     console.log("New hashed password:", hashedPassword); // Check this in the logs
 
     // Update user properties
     user.password = hashedPassword;
     user.resetPasswordToken = null;
     user.resetPasswordExpires = null;
 
     // Persist the updated user
     await repository.save(user);
 
     res.status(200).json({
       message: "Password reset successfully.",
     });
   } catch (err) {
     console.error("Error resetting password:", err);
     next(err);
   }
 };
 