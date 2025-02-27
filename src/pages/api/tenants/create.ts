import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import { TenantData } from '../../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, phone, address }: TenantData = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const db = await connectToDatabase();
      const collection = db.collection('tenants');
      await collection.insertOne({ name, email, phone, address });
      return res.status(201).json({ message: 'Tenant created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};