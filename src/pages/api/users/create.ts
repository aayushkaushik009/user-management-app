import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/db';
import User from '../../../models/User'; // Assuming you have a User model defined
import { hash } from 'bcryptjs'; // For password hashing

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password, tenantId } = req.body;

    if (!email || !password || !tenantId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            tenantId,
        });

        await user.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}