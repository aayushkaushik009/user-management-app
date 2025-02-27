import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tenant } from '../../types';

// ✅ Define props for TenantDetails component
interface TenantDetailsProps {
    tenant: Tenant;
}

// ✅ TenantDetails Component (Renders Tenant Information)
const TenantDetails: React.FC<TenantDetailsProps> = ({ tenant }) => {
    return (
        <div>
            <h2>{tenant.name}</h2>
            <p>Email: {tenant.email}</p>
            <p>Description: {tenant.description || 'N/A'}</p>
            <p>Created at: {tenant.createdAt ? new Date(tenant.createdAt).toLocaleString() : 'Unknown'}</p>
            <p>Updated at: {tenant.updatedAt ? new Date(tenant.updatedAt).toLocaleString() : 'Unknown'}</p>
        </div>
    );
};

// ✅ TenantDetailsPage Component (Fetches Data)
const TenantDetailsPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    // Ensure `id` is always a string (avoids TS errors)
    const tenantId = Array.isArray(id) ? id[0] : id;

    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenantDetails = async () => {
            if (!tenantId) return; // Prevents running fetch with `undefined` id

            try {
                const response = await fetch(`/api/tenants/${tenantId}`);
                if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch tenant details.`);
                
                const data: Tenant = await response.json();
                setTenant(data);
            } catch (err) {
                setError((err as Error).message || 'Failed to fetch tenant details.');
            } finally {
                setLoading(false);
            }
        };

        fetchTenantDetails();
    }, [tenantId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!tenant) return <div>No tenant found.</div>;

    return (
        <div>
            <h1>Tenant Details</h1>
            <TenantDetails tenant={tenant} />
        </div>
    );
};

export default TenantDetails;
