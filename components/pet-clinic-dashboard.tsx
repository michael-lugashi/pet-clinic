import Plus from "svg/Plus";
import Header from "./header";
import Card from "./card";
import { useQuery } from "@tanstack/react-query";
import { Patient } from "@/lib/interfaces";

const getPatients = async (): Promise<Patient[]> => {
  const response = await fetch('/api/patients');
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  const data: { patients: Patient[] } = await response.json();
  return data.patients;
};

// const TableHeaders = ['Client Name', 'Pet Name', 'Phone', 'Pet Age', 'Pet Type', 'Actions'];



export const PetClinicDashboard = () => {
  const { data: patients, isLoading, isError, error } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });
  
  return (
    // Change whatever you want here. It's just an example of using tailwind
    <div className="bg-light-purple min-h-screen w-full">
      <div className="flex flex-col gap-y-4 p-4 md:p-8 max-w-screen-2xl mx-auto">
        <Header title="Pet Clinic Management" subtitle="Manage your clinic's patients and their information" buttonText="Add New Patient" onClick={() => { console.log("Add Patient"); }} buttonFrontAdornment={<Plus className="h-4 w-4" />} />
        <Card>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {error.message}</div>}
          {patients && (
            <>
              <div className="flex flex-col gap-y-4"></div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};