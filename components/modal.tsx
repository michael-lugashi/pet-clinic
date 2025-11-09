import React from "react";
import { createPortal } from "react-dom";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useHandleEscape } from "@/hooks/useHandleEscape";
import { useModalKeyboardNav } from "@/hooks/useModalKeyboardNav";
import ClickableSvg from "./clickable-svg";
import X from "svg/X";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  closeOnOverlayClick?: boolean;
}

const Modal = ({ isOpen, onClose, children, title, className = "", closeOnOverlayClick = true }: ModalProps) => {
  useDisableScroll(isOpen);
  useHandleEscape(isOpen, onClose);
  const modalRef = useModalKeyboardNav(isOpen);

  if (!isOpen) return null;

  const CloseButton = (
    <ClickableSvg onClick={onClose} className="text-gray" ariaLabel="Close modal">
      <X className="h-6 w-6" />
    </ClickableSvg>
  );

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" />
      <div
        ref={modalRef}
        className={`relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <h2 className="text-xl font-semibold text-black">{title}</h2>
            {CloseButton}
          </div>
        )}
        <div className={title ? "p-6" : "p-6"}>
          {!title && <div className="absolute top-4 right-4">{CloseButton}</div>}
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
