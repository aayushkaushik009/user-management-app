import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import Tenant from "@/models/Tenant";
import { isAuthenticated } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();
        const session = await isAuthenticated(req, res);

        if (!session) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        switch (req.method) {
            case "GET":
                try {
                    let tenants;
                    if (session.role === "admin") {
                        tenants = await Tenant.find({}); // Admin gets all tenants
                    } else {
                        tenants = await Tenant.find({ users: session.user.id }); // Users & managers see assigned tenants
                    }

                    if (!tenants || tenants.length === 0) {
                        return res.status(404).json({ message: "No tenants found." });
                    }

                    return res.status(200).json(tenants);
                } catch (error) {
                    console.error("Error fetching tenants:", error);
                    return res.status(500).json({ message: "Error fetching tenants", error });
                }

            case "POST":
                try {
                    if (session.role !== "admin") {
                        return res.status(403).json({ message: "Access denied. Only admins can create tenants." });
                    }

                    const { name, email, phone, address, description, users } = req.body;

                    if (!name || !email || !phone || !address) {
                        return res.status(400).json({ message: "Missing required fields." });
                    }

                    const newTenant = new Tenant({
                        name,
                        email,
                        phone,
                        address,
                        description: description || "",
                        users: users || [],
                    });

                    await newTenant.save();
                    return res.status(201).json({ message: "Tenant created successfully", tenant: newTenant });
                } catch (error) {
                    console.error("Error creating tenant:", error);
                    return res.status(400).json({ message: "Error creating tenant", error });
                }

            default:
                return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
