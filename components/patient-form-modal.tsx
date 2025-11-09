import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { Patient, PetType } from "@/lib/interfaces";
import DropdownSelect from "./dropdown-select";
import FormTextBox from "./form-text-box";

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Omit<Patient, "id">) => void;
  patient?: Patient | null;
  isLoading?: boolean;
}

const petTypeOptions: { value: PetType; label: string }[] = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Fish", label: "Fish" },
  { value: "Other", label: "Other" },
];

interface FormField {
  id: keyof Omit<Patient, "id" | "petType">;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const formFields: FormField[] = [
  {
    id: "clientName",
    label: "Client Name",
    type: "text",
    placeholder: "Enter client name",
    required: true,
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter phone number",
    required: true,
  },
  {
    id: "petName",
    label: "Pet Name",
    type: "text",
    placeholder: "Enter pet name",
    required: true,
  },
  {
    id: "petAge",
    label: "Pet Age",
    type: "text",
    placeholder: "e.g., 5 years",
    required: true,
  },
];

const PatientFormModal = ({ isOpen, onClose, onSubmit, patient, isLoading = false }: PatientFormModalProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    petName: "",
    phone: "",
    petAge: "",
    petType: null as PetType | null,
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        clientName: patient.clientName,
        petName: patient.petName,
        phone: patient.phone,
        petAge: patient.petAge,
        petType: patient.petType,
      });
    } else {
      setFormData({
        clientName: "",
        petName: "",
        phone: "",
        petAge: "",
        petType: null,
      });
    }
  }, [patient, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.petType) return;

    onSubmit({
      clientName: formData.clientName,
      petName: formData.petName,
      phone: formData.phone,
      petAge: formData.petAge,
      petType: formData.petType,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.clientName.trim() !== "" &&
    formData.petName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.petAge.trim() !== "" &&
    formData.petType !== null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={patient ? "Edit Patient" : "Add New Patient"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <FormTextBox
            key={field.id}
            id={field.id}
            label={field.label}
            value={formData[field.id]}
            onChange={(value) => handleChange(field.id, value)}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}

        <div>
          <label className="block text-sm font-medium text-black mb-1">Pet Type *</label>
          <DropdownSelect
            options={petTypeOptions}
            selectedValue={formData.petType}
            onSelect={(value) => setFormData((prev) => ({ ...prev, petType: value }))}
            trigger={<span className="text-black">{formData.petType ? formData.petType : "Select pet type"}</span>}
            className="w-full"
            dropdownClassName="w-full"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-black/10 rounded-lg text-black hover:bg-gray/5 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 px-4 py-2 bg-dark-purple text-white rounded-lg hover:bg-dark-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Saving..." : patient ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PatientFormModal;
