import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react"; // ✅ Import NextAuth session
import { Tenant } from "../../types";
import { useRouter } from "next/router";

const TenantIndex = () => {
  const { data: session } = useSession(); // ✅ Get user session
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const fetchTenants = async () => {
      try {
        const response = await axios.get<Tenant[]>("/api/tenants");

        // ✅ Filter tenants: Admins see all, others see only their assigned tenants
        const userTenants =
          session.user.role === "admin"
            ? response.data
            : response.data.filter((tenant) => tenant.users.includes(session.user.id));

        setTenants(userTenants);
      } catch (err) {
        setError("Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await axios.delete(`/api/tenants/${id}`);
      setTenants((prev) => prev.filter((tenant) => tenant._id !== id));
    } catch (error) {
      alert("Error deleting tenant.");
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Tenant List</h1>

          {/* ✅ Only Admins can create tenants */}
          {session?.user.role === "admin" && (
            <Link href="/tenants/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Create Tenant
            </Link>
          )}
        </div>

        {tenants.length === 0 ? (
          <p className="text-gray-600">No tenants found.</p>
        ) : (
          <ul className="space-y-4">
            {tenants.map((tenant) => (
              <li key={tenant._id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{tenant.name}</h3>
                <p className="text-sm text-gray-600">{tenant.description || "No description"}</p>

                <div className="flex gap-2 mt-2">
  {/* ✅ Admins & Managers Can Edit */}
  {["admin", "manager"].includes(session?.user.role ?? "") && (
    <Link href={`/tenants/${tenant._id}/edit`} className="text-blue-500 hover:underline">
      Edit
    </Link>
  
                  )}

                  {/* ✅ Only Admins Can Delete */}
                  {session?.user.role === "admin" && (
                    <button onClick={() => handleDelete(tenant._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TenantIndex;
