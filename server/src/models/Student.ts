import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
  encryptedData: string;
}

const StudentSchema = new Schema<IStudent>({
  encryptedData: { type: String, required: true }
}, { timestamps: true });

export const Student = model<IStudent>('Student', StudentSchema);