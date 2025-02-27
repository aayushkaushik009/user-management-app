import mongoose, { Document, Schema, Types, Model } from "mongoose";
import bcrypt from "bcryptjs";

// ✅ User Roles
export type Role = "admin" | "manager" | "user";

// ✅ User Interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  tenant: Types.ObjectId; // ✅ User belongs to a tenant
  role: Role; // ✅ Role within the tenant
  resetPasswordToken?: string | null; // ✅ Ensure it's optional
  resetPasswordExpires?: Date | null; // ✅ Ensure it's optional
  comparePassword: (password: string) => Promise<boolean>;
}

// ✅ User Schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  tenant: { type: Schema.Types.ObjectId, ref: "Tenant", required: true }, // ✅ Reference to tenant
  role: { type: String, enum: ["admin", "manager", "user"], required: true },
  resetPasswordToken: { type: String, default: null }, // ✅ Ensure property exists
  resetPasswordExpires: { type: Date, default: null }, // ✅ Ensure property exists
});

// ✅ Hash Password Before Saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare Password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
