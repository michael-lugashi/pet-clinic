import React, { forwardRef } from "react";
import Filter from "svg/Filter";
import { PetType } from "@/lib/interfaces";
import DropdownSelect, { DropdownOption, DropdownSelectRef } from "./dropdown-select";

interface PetTypeFilterProps {
  selectedType: PetType | null;
  onSelectType: (type: PetType | null) => void;
  availableTypes: PetType[];
  onOpenChange?: (isOpen: boolean) => void;
}

const PetTypeFilter = forwardRef<DropdownSelectRef, PetTypeFilterProps>(
  ({ selectedType, onSelectType, availableTypes, onOpenChange }, ref) => {
    const options: DropdownOption<PetType>[] = availableTypes.map((type) => ({
      value: type,
      label: type,
    }));

    const trigger = (
      <>
        <Filter className="h-5 w-5" />
        <span>Pet Type</span>
      </>
    );

    return (
      <DropdownSelect
        ref={ref}
        options={options}
        selectedValue={selectedType}
        onSelect={onSelectType}
        trigger={trigger}
        showAllOption={true}
        allOptionLabel="All Types"
        onOpenChange={onOpenChange}
      />
    );
  }
);

PetTypeFilter.displayName = "PetTypeFilter";

export default PetTypeFilter;
