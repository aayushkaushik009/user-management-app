import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import axios from 'axios';

import { Tenant, TenantData } from '../../types';

interface TenantDetailsProps {
    tenant: Tenant;
}

const TenantDetails: React.FC<TenantDetailsProps> = ({ tenant }) => {
    return (
        <div>
            <h2>{tenant.name}</h2>
            <p>{tenant.description}</p>
            <p>Created at: {new Date(tenant.createdAt).toLocaleString()}</p>
            <p>Updated at: {new Date(tenant.updatedAt).toLocaleString()}</p>
        </div>
    );
};

interface TenantFormProps {
    tenant?: Tenant;
    onSubmit: (tenantData: TenantData) => Promise<void>;
}

const TenantForm: React.FC<TenantFormProps> = ({ tenant, onSubmit }) => {
    const [tenantData, setTenantData] = useState<TenantData>({
        name: tenant?.name || '',
        email: tenant?.email || '',
        phone: tenant?.phone || '',
        address: tenant?.address || '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Update form fields if tenant prop changes
    useEffect(() => {
        if (tenant) {
            setTenantData({
                name: tenant.name,
                email: tenant.email || '',
                phone: tenant.phone || '',
                address: tenant.address || '',
            });
        }
    }, [tenant]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTenantData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSubmit(tenantData);
            router.push('/tenants'); // Redirect after success
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while saving the tenant.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{tenant ? 'Edit Tenant' : 'Create Tenant'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Tenant Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={tenantData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={tenantData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={tenantData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={tenantData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : tenant ? 'Update Tenant' : 'Create Tenant'}
                </button>
            </form>
        </div>
    );
};

export default TenantForm;
