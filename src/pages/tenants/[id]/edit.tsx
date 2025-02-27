import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Tenant } from "../../types/index"; // ✅ Import Tenant type

const EditTenant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tenantData, setTenantData] = useState<Tenant>({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    _id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    users: [], // ✅ Added users field to match the Tenant type
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTenant = async () => {
      try {
        const response = await axios.get<Tenant>(`/api/tenants/${id}`); // ✅ Typed response
        setTenantData(response.data);
      } catch (error) {
        setError("Failed to fetch tenant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTenantData({ ...tenantData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tenants/${id}`, tenantData);
      router.push("/tenants");
    } catch (error) {
      setError("Failed to update tenant.");
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-4">Edit Tenant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={tenantData.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" required />
          <input name="email" value={tenantData.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 w-full" required />
          <input name="phone" value={tenantData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" required />
          <input name="address" value={tenantData.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full" required />
          <textarea name="description" value={tenantData.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditTenant;
