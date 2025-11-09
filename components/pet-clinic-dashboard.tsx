import Plus from "svg/Plus";
import Edit from "svg/Edit";
import Delete from "svg/Delete";
import Header from "./header";
import KeyboardShortcutsHint from "./keyboard-shortcuts-hint";
import Table, { TableRef } from "./table/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Patient, PetType } from "@/lib/interfaces";
import type { Header as TableHeader } from "./table/table";
import Card from "./card";
import ClickableSvg from "./clickable-svg";
import SearchBar from "./search-bar";
import PetTypeFilter from "./pet-type-filter";
import Badge from "./badge";
import { useAvailablePetTypes } from "@/hooks/useAvailablePetTypes";
import { useFilteredPatients } from "@/hooks/useFilteredPatients";
import { formatPhone } from "@/utils/formatPhone";
import PatientFormModal from "./patient-form-modal";
import DeleteConfirmModal from "./delete-confirm-modal";
import KeyboardShortcutsModal, { KeyboardShortcut } from "./keyboard-shortcuts-modal";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useState, useRef, useMemo } from "react";
import { DropdownSelectRef } from "./dropdown-select";

const getPatients = async (): Promise<Patient[]> => {
  const response = await fetch("/api/patients");
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  const data: { patients: Patient[] } = await response.json();
  return data.patients;
};

const createPatient = async (patient: Omit<Patient, "id">): Promise<Patient> => {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Failed to create patient");
  }
  const data: { patients: Patient } = await response.json();
  return data.patients;
};

const updatePatient = async (patient: Patient): Promise<Patient> => {
  const response = await fetch("/api/patients", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Failed to update patient");
  }
  const data: { patients: Patient } = await response.json();
  return data.patients;
};

const deletePatient = async (id: number): Promise<void> => {
  const response = await fetch(`/api/patients?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete patient");
  }
};

export const PetClinicDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState(-1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const queryClient = useQueryClient();
  const tableRef = useRef<TableRef>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const petTypeFilterRef = useRef<DropdownSelectRef>(null);

  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setIsEditModalOpen(false);
      setSelectedPatient(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
    },
  });

  const availablePetTypes = useAvailablePetTypes(patients);
  const { filteredPatients, searchQuery, setSearchQuery, selectedPetType, setSelectedPetType } =
    useFilteredPatients(patients);

  const handleAddClick = () => {
    setSelectedPatient(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (patient: Omit<Patient, "id">) => {
    createMutation.mutate(patient);
  };

  const handleEditSubmit = (patient: Omit<Patient, "id">) => {
    if (selectedPatient) {
      updateMutation.mutate({ ...patient, id: selectedPatient.id });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedPatient) {
      deleteMutation.mutate(selectedPatient.id);
    }
  };

  const handleRowAction = (row: Patient, action: "edit" | "delete") => {
    if (action === "edit") {
      handleEditClick(row);
    } else {
      handleDeleteClick(row);
    }
  };

  // Define keyboard shortcuts
  const keyboardShortcuts: KeyboardShortcut[] = useMemo(
    () => [
      { key: "?", description: "Show keyboard shortcuts", category: "General" },
      { key: "N", description: "Add new patient", category: "Actions" },
      { key: "/", description: "Focus search bar", category: "Navigation" },
      { key: "F", description: "Toggle pet type filter", category: "Navigation" },
      { key: "↑ / ↓", description: "Navigate table rows", category: "Navigation" },
      { key: "E", description: "Edit focused patient", category: "Actions" },
      { key: "D", description: "Delete focused patient", category: "Actions" },
      { key: "Tab", description: "Cycle through sort columns (forward)", category: "Table" },
      { key: "Shift + Tab", description: "Cycle through sort columns (backward)", category: "Table" },
      { key: "Escape", description: "Close modal / Clear focus", category: "General" },
    ],
    []
  );

  // Check if any modal is open
  const isAnyModalOpen =
    isAddModalOpen || isEditModalOpen || isDeleteModalOpen || isKeyboardShortcutsOpen || isFilterOpen;

  // Setup keyboard shortcut handlers
  useKeyboardShortcuts([
    {
      key: "?",
      shiftKey: true,
      handler: () => setIsKeyboardShortcutsOpen(true),
      enabled: !isAnyModalOpen,
    },
    {
      key: "/",
      handler: () => searchBarRef.current?.focus(),
      enabled: !isAnyModalOpen,
    },
    {
      key: "n",
      handler: handleAddClick,
      enabled: !isAnyModalOpen,
    },
    {
      key: "f",
      handler: () => petTypeFilterRef.current?.toggle(),
      enabled: !isAnyModalOpen,
    },
    {
      key: "ArrowDown",
      handler: () => tableRef.current?.focusNextRow(),
      enabled: !isAnyModalOpen && filteredPatients.length > 0,
    },
    {
      key: "ArrowUp",
      handler: () => tableRef.current?.focusPreviousRow(),
      enabled: !isAnyModalOpen && filteredPatients.length > 0,
    },
    {
      key: "e",
      handler: () => tableRef.current?.triggerAction("edit"),
      enabled: !isAnyModalOpen,
    },
    {
      key: "d",
      handler: () => tableRef.current?.triggerAction("delete"),
      enabled: !isAnyModalOpen,
    },
    {
      key: "Tab",
      handler: () => tableRef.current?.cycleSortColumns("next"),
      enabled: !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen && !isKeyboardShortcutsOpen,
    },
    {
      key: "Tab",
      shiftKey: true,
      handler: () => tableRef.current?.cycleSortColumns("previous"),
      enabled: !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen && !isKeyboardShortcutsOpen,
    },
    {
      key: "Escape",
      handler: () => {
        if (isFilterOpen) {
          setIsFilterOpen(false);
        } else {
          setFocusedRowIndex(-1);
        }
      },
      preventDefault: false,
      enabled: !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen && !isKeyboardShortcutsOpen,
    },
  ]);

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
      displayFn: (value) => <Badge>{String(value)}</Badge>,
    },
    {
      title: "Actions",
      key: "id",
      displayFn: (value, row) => (
        <div className="flex items-center gap-3">
          <ClickableSvg onClick={() => handleEditClick(row)} className="text-black/80" ariaLabel="Edit">
            <Edit className="h-5 w-5" />
          </ClickableSvg>
          <ClickableSvg onClick={() => handleDeleteClick(row)} className="text-red" ariaLabel="Delete">
            <Delete className="h-5 w-5" />
          </ClickableSvg>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-light-purple min-h-screen w-full">
        <div className="flex flex-col gap-y-4 p-4 md:p-8 max-w-screen-2xl mx-auto">
          <Header
            title="Pet Clinic Management"
            subtitle="Manage your clinic's patients and their information"
            buttonText="Add New Patient"
            onClick={handleAddClick}
            buttonFrontAdornment={<Plus className="h-4 w-4" />}
          />
          <Card>
            <div className="flex gap-3 mb-4">
              <SearchBar
                ref={searchBarRef}
                className="flex-grow"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, phone, pet name, type, or age..."
              />
              <PetTypeFilter
                ref={petTypeFilterRef}
                selectedType={selectedPetType}
                onSelectType={setSelectedPetType}
                availableTypes={availablePetTypes}
                onOpenChange={setIsFilterOpen}
              />
            </div>
            {isLoading && <div className="p-4">Loading...</div>}
            {isError && <div className="p-4 text-red-600">Error: {error.message}</div>}
            {patients && filteredPatients.length > 0 && (
              <>
                <Table
                  ref={tableRef}
                  headers={headers}
                  rows={filteredPatients}
                  focusedRowIndex={focusedRowIndex}
                  onRowFocus={setFocusedRowIndex}
                  onRowAction={handleRowAction}
                />
              </>
            )}
            {patients && filteredPatients.length === 0 && (
              <div className="p-4 text-center text-gray">No patients match this search</div>
            )}
          </Card>
          <KeyboardShortcutsHint />
        </div>
      </div>

      <PatientFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isLoading={createMutation.isPending}
      />

      <PatientFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPatient(null);
        }}
        onSubmit={handleEditSubmit}
        patient={selectedPatient}
        isLoading={updateMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPatient(null);
        }}
        onConfirm={handleDeleteConfirm}
        patient={selectedPatient}
        isLoading={deleteMutation.isPending}
      />

      <KeyboardShortcutsModal
        isOpen={isKeyboardShortcutsOpen}
        onClose={() => setIsKeyboardShortcutsOpen(false)}
        shortcuts={keyboardShortcuts}
      />
    </>
  );
};

export default PetClinicDashboard;
