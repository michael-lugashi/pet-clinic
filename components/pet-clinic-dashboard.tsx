import Plus from "svg/Plus";
import Edit from "svg/Edit";
import Delete from "svg/Delete";
import Header from "./header";
import Table from "./table/table";
import { useQuery } from "@tanstack/react-query";
import { Patient } from "@/lib/interfaces";
import type { Header as TableHeader } from "./table/table";
import Card from "./card";
import ClickableSvg from "./clickable-svg";

const getPatients = async (): Promise<Patient[]> => {
  const response = await fetch("/api/patients");
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  const data: { patients: Patient[] } = await response.json();
  return data.patients;
};

const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

const headers: TableHeader<Patient>[] = [
  {
    title: "Client Name",
    key: "clientName",
    sortFn: (a, b) => a.clientName.localeCompare(b.clientName),
  },
  {
    title: "Phone",
    key: "phone",
    displayFn: (value) => formatPhone(String(value)),
  },
  {
    title: "Pet Name",
    key: "petName",
    sortFn: (a, b) => a.petName.localeCompare(b.petName),
  },
  {
    title: "Pet Age",
    key: "petAge",
    sortFn: (a, b) => {
      const ageA = parseInt(a.petAge) || 0;
      const ageB = parseInt(b.petAge) || 0;
      return ageA - ageB;
    },
  },
  {
    title: "Pet Type",
    key: "petType",
    sortFn: (a, b) => a.petType.localeCompare(b.petType),
    displayFn: (value) => (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
        {String(value)}
      </span>
    ),
  },
  {
    title: "Actions",
    key: "id",
    displayFn: (value, row) => (
      <div className="flex items-center gap-3">
        <ClickableSvg onClick={() => console.log("Edit", row)} className="text-black/80" ariaLabel="Edit">
          <Edit className="h-5 w-5" />
        </ClickableSvg>
        <ClickableSvg onClick={() => console.log("Delete", row)} className="text-red" ariaLabel="Delete">
          <Delete className="h-5 w-5" />
        </ClickableSvg>
      </div>
    ),
  },
];

export const PetClinicDashboard = () => {
  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return (
    <div className="bg-light-purple min-h-screen w-full">
      <div className="flex flex-col gap-y-4 p-4 md:p-8 max-w-screen-2xl mx-auto">
        <Header
          title="Pet Clinic Management"
          subtitle="Manage your clinic's patients and their information"
          buttonText="Add New Patient"
          onClick={() => {
            console.log("Add Patient");
          }}
          buttonFrontAdornment={<Plus className="h-4 w-4" />}
        />
        <Card>
          {isLoading && <div className="p-4">Loading...</div>}
          {isError && <div className="p-4 text-red-600">Error: {error.message}</div>}
          {patients && <Table headers={headers} rows={patients} />}
        </Card>
      </div>
    </div>
  );
};
