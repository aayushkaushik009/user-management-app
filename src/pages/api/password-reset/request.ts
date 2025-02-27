import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';
import User, { IUser } from '@/models/User'; // Ensure IUser is defined in your User model
import { sendPasswordResetEmail } from '@/utils/auth';
import { generateResetToken } from '@/utils/token';
import { Document } from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'A valid email is required' });
    }

    try {
        await connectToDatabase();

        // Explicitly define user type
        const user: (Document & IUser) | null = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure _id is properly typed
        const resetToken = generateResetToken(String(user._id)); // Convert to string safely

        await sendPasswordResetEmail(user.email, resetToken);

        return res.status(200).json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
