import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import authOptions from "../pages/api/auth/[...nextauth]";
import User from "../models/User";
import { connectToDatabase } from "./db";

/**
 * ✅ Sends a password reset email with a secure token.
 * @param email User's email address
 */
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) throw new Error("User with this email does not exist.");

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,  // Use Mailtrap SMTP Host
        port: Number(process.env.EMAIL_PORT),  // Ensure port is correctly parsed
        auth: {
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `Click the following link to reset your password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
};

/**
 * ✅ Checks if the user is authenticated.
 * @param req Next.js API Request
 * @param res Next.js API Response
 * @returns Session object or throws an error
 */
export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return null;
    }
    return session;
};

/**
 * ✅ Resets the user password using a secure token.
 * @param token Reset token
 * @param newPassword New password to set
 */
export const resetPassword = async (token: string, newPassword: string) => {
    await connectToDatabase();

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }, // Ensure token is valid
    });

    if (!user) throw new Error("Invalid or expired reset token.");

    // Hash the new password securely
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
};

/**
 * ✅ Registers a new user securely.
 * @param email User email
 * @param password User password
 * @returns Created user object
 */
export const registerUser = async ({ email, password }: { email: string; password: string }) => {
    await connectToDatabase();

    // Check if email already exists
    if (await User.findOne({ email })) throw new Error("Email already registered.");

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        role: "user", // Default role
    });

    await newUser.save();
    return newUser;
};
