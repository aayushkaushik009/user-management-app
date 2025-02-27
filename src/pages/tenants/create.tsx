import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TenantForm from '../../components/Tenant/TenantForm';
import { TenantData } from '../../types';

const CreateTenant = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleCreateTenant = async (tenantData: TenantData): Promise<void> => {
    try {
      await axios.post('/api/tenants/create', tenantData);
      router.push('/tenants');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while creating the tenant.');
    }
  };

  return (
    <div>
      <h1>Create New Tenant</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TenantForm onSubmit={handleCreateTenant} />
    </div>
  );
};

export default CreateTenant;