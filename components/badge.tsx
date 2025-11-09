import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "purple" | "outline";
}

const Badge = ({ children, className = "", variant = "purple" }: BadgeProps) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm";

  const variantClasses = {
    default: "bg-gray/10 text-gray",
    purple: "bg-dark-purple/10 text-dark-purple",
    outline: "border border-black/10 text-black",
  };

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>;
};

export default Badge;
