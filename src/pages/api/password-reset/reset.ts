import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import User from '../../../models/User';
import { sendResetEmail } from '../../../utils/email';
import { generateToken } from '../../../utils/token';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import bcrypt from 'bcryptjs';

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    try {
        await connectToDatabase();

        // Verify the token and get user ID
        const userId = await verifyToken(token);
        if (!userId) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to verify JWT token
const verifyToken = async (token: string): Promise<string | null> => {
    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT secret is missing');
            return null;
        }

        // Verify token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

        // Find the user in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return null;
        }

        return user._id.toString(); // ✅ Explicitly convert ObjectId to string
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

// const verifyToken = async (token: string): Promise<string | null> => {
//     try {
//         if (!process.env.JWT_SECRET) {
//             console.error('JWT secret is missing');
//             return null;
//         }

//         // Verify token and decode user ID
//         const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

//         // Find the user in the database
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return null;
//         }

//         return user._id.toString(); // Ensure correct string return type
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         return null;
//     }
// };
