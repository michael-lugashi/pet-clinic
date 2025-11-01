// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Patient } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

interface PatientResult {
  patients?: Array<Patient> | Patient;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult | { error: string }>,
) {
  if (req.method === "POST") {
    return await create(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
  if (req.method === "DELETE") {
    return await del(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  // insert to database
  const patient: Patient = {
    id: 1,
    clientName: "Alice Smith",
    petName: "Max",
    phone: "1234567890",
    petAge: "5 years",
    petType: "Dog",
    
  };
  const patients = [patient];
  res.status(200).json({ patients });
};
const read = async (req: NextApiRequest, res: NextApiResponse) => {
  // load from database
  await wait(1000);
  try {
    const patients: Patient[] = [
      {
        id: 1,
        clientName: "John Doe",
        petName: "Boc",
        phone: "1234567890",
        petAge: "10 years",
        petType: "Dog",
      },
      {
        id: 2,
        clientName: "Jane Doe",
        petName: "Charlie",
        phone: "1234567890",
        petAge: "5 years",
        petType: "Cat",
      },
    ];
    res.status(200).json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }

};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  // delete from database
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));