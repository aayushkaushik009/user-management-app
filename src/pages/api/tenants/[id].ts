import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import Tenant from '../../../models/Tenant'; // Assuming you have a Tenant model defined

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const tenant = await Tenant.findById(id);
                if (!tenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.status(200).json(tenant);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching tenant', error });
            }
            break;

        case 'PUT':
            try {
                const tenant = await Tenant.findByIdAndUpdate(id, req.body, { new: true });
                if (!tenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.status(200).json(tenant);
            } catch (error) {
                res.status(500).json({ message: 'Error updating tenant', error });
            }
            break;

        case 'DELETE':
            try {
                const deletedTenant = await Tenant.findByIdAndDelete(id);
                if (!deletedTenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.status(204).end(); // No content
            } catch (error) {
                res.status(500).json({ message: 'Error deleting tenant', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}