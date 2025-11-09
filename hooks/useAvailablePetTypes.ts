import { useMemo } from "react";
import { Patient, PetType } from "@/lib/interfaces";

export const useAvailablePetTypes = (patients: Patient[] | undefined): PetType[] => {
  return useMemo(() => {
    if (!patients) return [];
    const types = new Set<PetType>();
    patients.forEach((patient) => types.add(patient.petType));
    return Array.from(types).sort();
  }, [patients]);
};
