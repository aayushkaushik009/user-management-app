// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import TenantForm from "../../components/Tenant/TenantForm";
// import { TenantData, User } from "../../types";

// const CreateTenant = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState<User[]>([]); // ✅ Fetch users for assignment

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get<User[]>("/api/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleCreateTenant = async (tenantData: TenantData) => {
//     try {
//       await axios.post("/api/tenants/create", tenantData);
//       router.push("/tenants");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "An error occurred while creating the tenant.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-4">Create New Tenant</h1>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
        
//         {/* ✅ Pass fetched users to the form for assignment */}
//         <TenantForm onSubmit={handleCreateTenant} users={users} />
//       </div>
//     </div>
//   );
// };

// export default CreateTenant;


// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const CreateTenant = () => {
//   const router = useRouter();
//   const [tenantData, setTenantData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     description: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setTenantData({ ...tenantData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/tenants", tenantData);
//       router.push("/tenants");
//     } catch (error) {
//       alert("Error creating tenant.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-xl font-bold text-center mb-4">Create Tenant</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" required />
//           <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
//           <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" required />
//           <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" required />
//           <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
//           <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Create</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTenant;



import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CreateTenant = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session || session.user.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);

    return (
        <div>
            <h1>Create New Tenant</h1>
            {/* Tenant creation form */}
        </div>
    );
};

export default CreateTenant;
