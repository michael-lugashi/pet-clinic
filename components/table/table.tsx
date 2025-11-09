import { useMemo, useState } from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import type { SortDirection } from "@/lib/interfaces";

export type Header<T> = {
  title: string;
  key: keyof T;
  sortFn?: (a: T, b: T) => number;
  displayFn?: (value: T[keyof T], row: T, key: keyof T) => React.ReactNode;
};

type TableProps<T> = {
  headers: Header<T>[];
  rows: T[];
};

function Table<T extends object>({ headers, rows }: TableProps<T>) {
  const [sortState, setSortState] = useState<{
    key: keyof T | null;
    direction: SortDirection;
  }>({ key: null, direction: null });

  const handleSort = (header: Header<T>) => {
    if (!header.sortFn) return;

    const newDirection =
      sortState.key === header.key && sortState.direction === "asc"
        ? "desc"
        : sortState.key === header.key && sortState.direction === "desc"
        ? null
        : "asc";

    setSortState({
      key: newDirection ? header.key : null,
      direction: newDirection,
    });
  };

  const sortedRows = useMemo(() => {
    if (sortState.key === null || sortState.direction === null) {
      return rows;
    }

    const header = headers.find((h) => h.key === sortState.key);
    if (!header?.sortFn) return rows;

    const sorted = [...rows].sort(header.sortFn);
    return sortState.direction === "desc" ? sorted.reverse() : sorted;
  }, [rows, sortState, headers]);

  return (
    <table className="w-full rounded-xl overflow-hidden border border-black/10 border-spacing-0 border-separate">
      <TableHeaders headers={headers} sortState={sortState} onSort={handleSort} />
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <TableRow key={rowIndex} row={row} headers={headers} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
