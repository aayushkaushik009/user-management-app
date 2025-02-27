import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TenantDetails from '../../components/Tenant/TenantDetails';
import { Tenant } from '../../types';

const TenantDetailsPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchTenantDetails = async () => {
                try {
                    const response = await axios.get<Tenant>(`/api/tenants/${id}`);
                    setTenant(response.data);
                } catch (err) {
                    setError('Failed to load tenant details.');
                } finally {
                    setLoading(false);
                }
            };

            fetchTenantDetails();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!tenant) {
        return <div>No tenant found.</div>;
    }

    return (
        <div>
            <h1>Tenant Details</h1>
            {/* ✅ Ensure `tenant` is correctly passed */}
            <TenantDetails tenant={tenant} />
        </div>
    );
};

export default TenantDetailsPage;
