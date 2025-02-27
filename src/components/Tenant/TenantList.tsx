import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tenant } from '../../types';

const TenantList: React.FC = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await axios.get<Tenant[]>('/api/tenants');
                setTenants(response.data);
            } catch (err) {
                setError('Failed to fetch tenants');
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Tenant List</h2>
            <ul>
                {tenants.map((tenant) => (
                    <li key={tenant._id}>
                        <h3>{tenant.name}</h3>
                        <p>{tenant.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TenantList;