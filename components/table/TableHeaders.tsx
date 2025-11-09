import SortIcon from "./SortIcon";
import type { Header } from "./table";
import type { SortDirection } from "@/lib/interfaces";

type TableHeadersProps<T> = {
  headers: Header<T>[];
  sortState: {
    key: keyof T | null;
    direction: SortDirection;
  };
  onSort: (header: Header<T>) => void;
};

const TableHeaders = <T extends object>({ headers, sortState, onSort }: TableHeadersProps<T>) => {
  return (
    <thead>
      <tr className=" ">
        {headers.map((header) => (
          <th
            key={String(header.key)}
            className={`text-left py-3 px-4 font-medium border-b border-black/10 ${
              header.sortFn ? "cursor-pointer hover:bg-black/10 hover:text-dark-purple transition-all duration-300" : ""
            }`}
            onClick={() => onSort(header)}
          >
            <span className="flex items-center">
              {header.title}
              {header.sortFn && <SortIcon direction={sortState.key === header.key ? sortState.direction : null} />}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
