import SortAsc from "../../svg/SortAsc";
import SortDesc from "../../svg/SortDesc";
import SortUnsorted from "../../svg/SortUnsorted";
import { SortDirection } from "@/lib/interfaces";

type SortIconProps = {
  direction: SortDirection;
};

const SortIcon = ({ direction }: SortIconProps) => {
  if (direction === "asc") {
    return <SortAsc className="inline-block ml-2 h-4 w-4" />;
  }
  if (direction === "desc") {
    return <SortDesc className="inline-block ml-2 h-4 w-4" />;
  }
  return <SortUnsorted className="inline-block ml-2 h-4 w-4" />;
};

export default SortIcon;
