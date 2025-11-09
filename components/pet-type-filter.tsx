import React from "react";
import Filter from "svg/Filter";
import { PetType } from "@/lib/interfaces";
import DropdownSelect, { DropdownOption } from "./dropdown-select";

interface PetTypeFilterProps {
  selectedType: PetType | null;
  onSelectType: (type: PetType | null) => void;
  availableTypes: PetType[];
}

const PetTypeFilter = ({ selectedType, onSelectType, availableTypes }: PetTypeFilterProps) => {
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
      options={options}
      selectedValue={selectedType}
      onSelect={onSelectType}
      trigger={trigger}
      showAllOption={true}
      allOptionLabel="All Types"
    />
  );
};

export default PetTypeFilter;
