import { useState, useMemo } from "react";
import { Patient, PetType } from "@/lib/interfaces";
import { useDebounce } from "./useDebounce";

export const useFilteredPatients = (patients: Patient[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPetType, setSelectedPetType] = useState<PetType | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    let filtered = patients;

    // Filter by pet type
    if (selectedPetType) {
      filtered = filtered.filter((patient) => patient.petType === selectedPetType);
    }

    // Filter by search query (clientName, phone, petName, petAge, petType)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter((patient) => {
        const clientName = patient.clientName.toLowerCase();
        const phone = patient.phone.toLowerCase();
        const petName = patient.petName.toLowerCase();
        const petAge = patient.petAge.toLowerCase();
        const petType = patient.petType.toLowerCase();

        return (
          clientName.includes(query) ||
          phone.includes(query) ||
          petName.includes(query) ||
          petAge.includes(query) ||
          petType.includes(query)
        );
      });
    }

    return filtered;
  }, [patients, debouncedSearchQuery, selectedPetType]);

  return {
    filteredPatients,
    searchQuery,
    setSearchQuery,
    selectedPetType,
    setSelectedPetType,
  };
};
