// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Patient } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import PatientModel from "@/lib/models/Patient";

interface PatientResult {
  patients?: Array<Patient> | Patient;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PatientResult | { error: string }>) {
  try {
    // Connect to database
    await connectDB();

    if (req.method === "POST") {
      return await create(req, res);
    }
    if (req.method === "GET") {
      return await read(req, res);
    }
    if (req.method === "PUT") {
      return await update(req, res);
    }
    if (req.method === "DELETE") {
      return await del(req, res);
    }

    // Method not allowed
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { clientName, petName, phone, petAge, petType } = req.body;

    // Validate required fields
    if (!clientName || !petName || !phone || !petAge || !petType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new patient
    const patient = await PatientModel.create({
      clientName,
      petName,
      phone,
      petAge,
      petType,
    });

    // Convert to plain object and format for response
    const patientData: Patient = {
      _id: String(patient._id),
      clientName: patient.clientName,
      petName: patient.petName,
      phone: patient.phone,
      petAge: patient.petAge,
      petType: patient.petType,
      createdAt: patient.createdAt?.toISOString(),
      updatedAt: patient.updatedAt?.toISOString(),
    };

    res.status(201).json({ patients: [patientData] });
  } catch (error: any) {
    console.error("Create error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create patient" });
  }
};

const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // If ID is provided, get single patient
    if (id) {
      const patient = await PatientModel.findById(id);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const patientData: Patient = {
        _id: String(patient._id),
        clientName: patient.clientName,
        petName: patient.petName,
        phone: patient.phone,
        petAge: patient.petAge,
        petType: patient.petType,
        createdAt: patient.createdAt?.toISOString(),
        updatedAt: patient.updatedAt?.toISOString(),
      };

      return res.status(200).json({ patients: patientData });
    }

    // Get all patients
    const patients = await PatientModel.find().sort({ createdAt: -1 });

    const patientsData: Patient[] = patients.map((patient) => ({
      _id: String(patient._id),
      clientName: patient.clientName,
      petName: patient.petName,
      phone: patient.phone,
      petAge: patient.petAge,
      petType: patient.petType,
      createdAt: patient.createdAt?.toISOString(),
      updatedAt: patient.updatedAt?.toISOString(),
    }));

    res.status(200).json({ patients: patientsData });
  } catch (error) {
    console.error("Read error:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, clientName, petName, phone, petAge, petType } = req.body;

    if (!_id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    // Update patient
    const patient = await PatientModel.findByIdAndUpdate(
      _id,
      {
        clientName,
        petName,
        phone,
        petAge,
        petType,
      },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientData: Patient = {
      _id: String(patient._id),
      clientName: patient.clientName,
      petName: patient.petName,
      phone: patient.phone,
      petAge: patient.petAge,
      petType: patient.petType,
      createdAt: patient.createdAt?.toISOString(),
      updatedAt: patient.updatedAt?.toISOString(),
    };

    res.status(200).json({ patients: patientData });
  } catch (error: any) {
    console.error("Update error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update patient" });
  }
};

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patient = await PatientModel.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({ patients: { _id: String(patient._id) } });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete patient" });
  }
};
