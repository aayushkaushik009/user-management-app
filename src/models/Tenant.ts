import mongoose, { Schema, Document } from 'mongoose';

interface ITenant extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const TenantSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

export default mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);
