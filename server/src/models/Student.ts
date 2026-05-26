import { Schema, model, Document } from 'mongoose';
export interface IStudent extends Document {
  name: string;
  email: string;
  emailHash: string; //-->  uSed to  enforce uniqueness on encrypted fields
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  emailHash: { type: String, required: true, unique: true }, // Enforces uniioueness
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export const Student = model<IStudent>('Student', StudentSchema);


// import { Schema, model, Document } from 'mongoose';

// export interface IStudent extends Document {
//   encryptedData: string;
// }

// const StudentSchema = new Schema<IStudent>({
//   encryptedData: { type: String, required: true }
// }, { timestamps: true });

// export const Student = model<IStudent>('Student', StudentSchema);