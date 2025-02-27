import { useEffect, useState } from 'react';
import TenantList from '../../components/Tenant/TenantList';
import { Tenant } from '../../types';
import { fetchTenants } from '../../utils/db';

const TenantIndex = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTenants = async () => {
            try {
                const data = await fetchTenants();
                setTenants(data);
            } catch (err) {
                setError('Failed to load tenants');
            } finally {
                setLoading(false);
            }
        };

        getTenants();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Tenants</h1>
            <TenantList tenants={tenants} />
        </div>
    );
};

export default TenantIndex;