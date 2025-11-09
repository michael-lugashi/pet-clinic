import React from "react";
import Modal from "./modal";
import { Patient } from "@/lib/interfaces";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patient: Patient | null;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, patient, isLoading = false }: DeleteConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Patient">
      <div className="space-y-4">
        <p className="text-gray">
          Are you sure you want to delete the patient record for{" "}
          <span className="font-semibold text-black">{patient?.clientName}</span>
          {patient?.petName && (
            <>
              {" "}
              and their pet <span className="font-semibold text-black">{patient.petName}</span>
            </>
          )}
          ? This action cannot be undone.
        </p>

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
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red text-white rounded-lg hover:bg-red/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
