import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/db';
import User from '../../../models/User'; // Assuming you have a User model defined

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching user', error });
            }
            break;

        case 'PUT':
            try {
                const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json({ message: 'Error updating user', error });
            }
            break;

        case 'DELETE':
            try {
                const deletedUser = await User.findByIdAndDelete(id);
                if (!deletedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(204).json({ message: 'User deleted' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}