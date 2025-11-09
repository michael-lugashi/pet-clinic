import React from "react";

interface ClickableSvgProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const ClickableSvg = ({ children, onClick, className = "", ariaLabel }: ClickableSvgProps) => {
  const baseClasses = "hover:scale-125 transition-transform duration-300 hover:bg-dark-purple/10 rounded-md p-1";

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} aria-label={ariaLabel} title={ariaLabel}>
      {children}
    </button>
  );
};

export default ClickableSvg;
