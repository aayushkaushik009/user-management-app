import mongoose, { Schema, Document, Types, Model } from "mongoose";

// Tenant Interface
export interface ITenant extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  users: Types.ObjectId[]; // ✅ List of users belonging to the tenant
}

// Tenant Schema
const TenantSchema: Schema<ITenant> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }], // ✅ Reference to users
});

const Tenant: Model<ITenant> = mongoose.models.Tenant || mongoose.model<ITenant>("Tenant", TenantSchema);
export default Tenant;
