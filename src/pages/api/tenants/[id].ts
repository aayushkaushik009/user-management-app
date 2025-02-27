import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";
import Tenant from "../../../models/Tenant";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const tenant = await Tenant.findById(id);
        if (!tenant) return res.status(404).json({ message: "Tenant not found" });
        return res.status(200).json(tenant);
      } catch (error) {
        return res.status(500).json({ message: "Error fetching tenant", error });
      }

    case "PUT":
      try {
        const updatedTenant = await Tenant.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTenant) return res.status(404).json({ message: "Tenant not found" });
        return res.status(200).json(updatedTenant);
      } catch (error) {
        return res.status(400).json({ message: "Error updating tenant", error });
      }

    case "DELETE":
      try {
        const deletedTenant = await Tenant.findByIdAndDelete(id);
        if (!deletedTenant) return res.status(404).json({ message: "Tenant not found" });
        return res.status(200).json({ message: "Tenant deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error deleting tenant", error });
      }

    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
