// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import TenantForm from "../../components/Tenant/TenantForm";
// import { Tenant, TenantData } from "../../types";

// const TenantDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [tenant, setTenant] = useState<Tenant | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       const fetchTenantDetails = async () => {
//         try {
//           const response = await axios.get<Tenant>(`/api/tenants/${id}`);
//           setTenant(response.data);
//         } catch (err) {
//           setError("Failed to load tenant details.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchTenantDetails();
//     }
//   }, [id]);

//   const handleUpdateTenant = async (updatedData: TenantData) => {
//     try {
//       await axios.put(`/api/tenants/${id}`, updatedData);
//       router.push("/tenants");
//     } catch (err) {
//       setError("Failed to update tenant.");
//     }
//   };

//   const handleDeleteTenant = async () => {
//     if (!window.confirm("Are you sure you want to delete this tenant?")) return;
//     try {
//       await axios.delete(`/api/tenants/${id}`);
//       router.push("/tenants");
//     } catch (err) {
//       setError("Failed to delete tenant.");
//     }
//   };

//   if (loading) return <div className="text-center p-6">Loading...</div>;
//   if (error) return <div className="text-red-500 p-6">{error}</div>;
//   if (!tenant) return <div className="text-gray-500 p-6">No tenant found.</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-4">Edit Tenant</h1>
        
//         {/* ✅ Pass existing data for editing */}
//         <TenantForm onSubmit={handleUpdateTenant} initialData={tenant} />

//         {/* ✅ Delete button */}
//         <button
//           onClick={handleDeleteTenant}
//           className="mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
//         >
//           Delete Tenant
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TenantDetailsPage;


import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/db";
import Tenant from "../../models/Tenant";

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
