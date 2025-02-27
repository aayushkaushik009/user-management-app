import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/db';
import User from '../../../models/User'; // Assuming you have a User model defined

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching users', error });
            }
            break;

        case 'POST':
            try {
                const newUser = new User(req.body);
                await newUser.save();
                res.status(201).json(newUser);
            } catch (error) {
                res.status(400).json({ message: 'Error creating user', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}