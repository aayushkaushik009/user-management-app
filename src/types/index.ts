// 🔹 User Interface: Represents a system user
export interface User {
    readonly _id: string; // Immutable unique identifier
    name: string;
    email: string;
    role: "admin" | "manager" | "user"; // Restrict role values
    tenant: string; // ✅ Associate user with a tenant
}

// 🔹 Tenant Interface: Represents a tenant entity
export interface Tenant {
    readonly _id: string; // MongoDB uses _id instead of id
    name: string;
    email: string;
    phone: string;
    address: string;
    description?: string; // Optional property
    users: string[]; // ✅ Store assigned user IDs
    createdAt: Date; // Ensure it's handled as a Date object
    updatedAt: Date;
}

// 🔹 Tenant Data Interface: Used for input forms / API requests
export interface TenantData {
    name: string;
    email: string;
    phone: string;
    address: string;
    description?: string; // ✅ Keep optional for new tenants
    users?: string[]; // ✅ Assign users when creating a tenant
}

// 🔹 Role Interface: Defines user roles and associated permissions
export interface Role {
    readonly _id: string; // Use _id for consistency with MongoDB
    name: "admin" | "manager" | "user"; // Strictly typed role names
    permissions: string[]; // Array of permission strings
}

// 🔹 Role-Based Access Control (RBAC) Interface
export interface AccessControl {
    role: "admin" | "manager" | "user"; // ✅ Restrict role values
    tenant: string; // ✅ Associate role with a tenant
    permissions: string[]; // ✅ Store actions allowed for the role
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

import "next-auth";

// ✅ Extend NextAuth's `User` and `Session` types
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "admin" | "manager" | "user"; // ✅ Add role
    tenant: string; // ✅ Ensure tenant ID is included
  }

  interface Session {
    user: User; // ✅ Ensure session.user exists with all fields
  }
}
