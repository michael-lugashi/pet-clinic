import mongoose, { Schema, Model, models, Document } from "mongoose";
import { PetType } from "../interfaces";

export interface IPatient extends Document {
  clientName: string;
  petName: string;
  phone: string;
  petAge: string;
  petType: PetType;
  createdAt?: Date;
  updatedAt?: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    petName: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    petAge: {
      type: String,
      required: [true, "Pet age is required"],
      trim: true,
    },
    petType: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Fish", "Other"],
      required: [true, "Pet type is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
PatientSchema.index({ clientName: 1 });
PatientSchema.index({ petName: 1 });
PatientSchema.index({ petType: 1 });

// Prevent model recompilation during hot reloading in development
const Patient: Model<IPatient> = models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
