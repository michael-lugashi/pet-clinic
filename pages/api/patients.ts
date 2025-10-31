// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatient } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

interface PatientResult {
  pateints?: Array<IPatient> | IPatient;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>,
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
  const patient: IPatient = { name: "Alice" };
  const patients = [patient];
  res.status(200).json({ patients });
};
const read = async (req: NextApiRequest, res: NextApiResponse) => {
  // load from database
  const patients = [{ name: "Boc" }, { name: "Charlie" }];
  res.status(200).json({ patients });
};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  // delete from database
};
