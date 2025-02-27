import React from "react";
import { Tenant } from "../../types";

interface TenantListProps {
  tenants: Tenant[]; // ✅ Accept tenants as a prop
}

const TenantList: React.FC<TenantListProps> = ({ tenants }) => {
  if (!tenants.length) {
    return <div>No tenants found.</div>;
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
