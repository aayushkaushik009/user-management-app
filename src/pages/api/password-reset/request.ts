import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import User, { IUser } from "@/models/User";
import { sendPasswordResetEmail } from "@/utils/auth";
import crypto from "crypto";
import { Document } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email } = req.body;

    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "A valid email is required" });
    }

    try {
        await connectToDatabase();

        // Find user in the database
        const user: (Document & IUser) | null = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate and store password reset token
        const resetToken = await generateAndStoreResetToken(user);

        // Send email (without passing token as an argument)
        await sendPasswordResetEmail(user.email);

        return res.status(200).json({ message: "Password reset link sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Generates a secure reset token, hashes it, stores it in DB, and returns the plain token.
 */
const generateAndStoreResetToken = async (user: Document & IUser): Promise<string> => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
    await user.save();

    return resetToken; // The plain token will be sent via email
};
