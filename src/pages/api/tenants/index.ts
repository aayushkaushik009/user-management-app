import { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '../../../utils/db';
import Tenant from '../../../models/Tenant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const tenants = await Tenant.find({});
                res.status(200).json(tenants);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching tenants', error });
            }
            break;

        case 'POST':
            try {
                const tenant = new Tenant(req.body);
                await tenant.save();
                res.status(201).json(tenant);
            } catch (error) {
                res.status(400).json({ message: 'Error creating tenant', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}