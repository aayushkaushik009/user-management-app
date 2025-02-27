import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// **Define the User Interface**
export interface IUser extends Document {
    _id: Types.ObjectId;  // ✅ Explicitly define _id to prevent type errors
    name: string;
    email: string;
    role: 'user' | 'manager' | 'admin';
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

// **Define the User Schema**
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'manager', 'admin'] },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});

// **Middleware: Hash password before saving**
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// **Method: Compare Password**
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// **Export Model - Ensure Reuse to Prevent Overwrite Issues**
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
