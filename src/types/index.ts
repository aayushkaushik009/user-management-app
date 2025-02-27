// 🔹 User Interface: Represents a system user
export interface User {
    readonly _id: string; // Immutable unique identifier
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'user'; // Restrict role values
}

// 🔹 Tenant Interface: Represents a tenant entity
export interface Tenant {
    readonly _id: string; // MongoDB uses _id instead of id
    name: string;
    email: string;
    phone: string;
    address: string;
    description?: string; // Optional property
    createdAt: Date; // Ensure it's handled as a Date object
    updatedAt: Date;
}

// 🔹 Tenant Data Interface: Used for input forms / API requests
export interface TenantData {
    name: string;
    email: string;
    phone: string;
    address: string;
    description?: string; // Optional for flexibility
}

// 🔹 Role Interface: Defines user roles and associated permissions
export interface Role {
    readonly _id: string; // Use _id for consistency with MongoDB
    name: 'admin' | 'manager' | 'user'; // Strictly typed role names
    permissions: string[]; // Array of permission strings
}

// 🔹 Password Reset Request Interface: For initiating password resets
export interface PasswordResetRequest {
    email: string;
    token: string; // Allow dynamic assignment
}

// 🔹 Password Reset Interface: For updating passwords securely
export interface PasswordReset {
    newPassword: string;
    confirmPassword: string;
}
