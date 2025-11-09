import { useMemo, useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
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
  focusedRowIndex?: number;
  onRowFocus?: (index: number) => void;
  onRowAction?: (row: T, action: "edit" | "delete") => void;
};

export type TableRef = {
  focusNextRow: () => void;
  focusPreviousRow: () => void;
  getCurrentFocusedRow: () => number;
  triggerAction: (action: "edit" | "delete") => void;
  cycleSortColumns: (direction: "next" | "previous") => void;
};

function TableInner<T extends object>(
  { headers, rows, focusedRowIndex = -1, onRowFocus, onRowAction }: TableProps<T>,
  ref: React.Ref<TableRef>
) {
  const [sortState, setSortState] = useState<{
    key: keyof T | null;
    direction: SortDirection;
  }>({ key: null, direction: null });
  const [internalFocusedRow, setInternalFocusedRow] = useState(focusedRowIndex);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    setInternalFocusedRow(focusedRowIndex);
  }, [focusedRowIndex]);

  const currentFocusedRow = onRowFocus !== undefined ? focusedRowIndex : internalFocusedRow;

  const handleRowFocus = (index: number) => {
    if (onRowFocus) {
      onRowFocus(index);
    } else {
      setInternalFocusedRow(index);
    }
  };

  useImperativeHandle(ref, () => ({
    focusNextRow: () => {
      const nextIndex = Math.min(currentFocusedRow + 1, rows.length - 1);
      handleRowFocus(nextIndex);
      rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    focusPreviousRow: () => {
      const prevIndex = Math.max(currentFocusedRow - 1, 0);
      handleRowFocus(prevIndex);
      rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    getCurrentFocusedRow: () => currentFocusedRow,
    triggerAction: (action: "edit" | "delete") => {
      if (currentFocusedRow >= 0 && currentFocusedRow < rows.length) {
        const row = sortedRows[currentFocusedRow];
        onRowAction?.(row, action);
      }
    },
    cycleSortColumns: (direction: "next" | "previous") => {
      const sortableHeaders = headers.filter((h) => h.sortFn);
      if (sortableHeaders.length === 0) return;

      const currentIndex = sortableHeaders.findIndex((h) => h.key === sortState.key);
      let nextIndex: number;

      if (direction === "next") {
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % sortableHeaders.length;
      } else {
        nextIndex = currentIndex <= 0 ? sortableHeaders.length - 1 : currentIndex - 1;
      }

      const nextHeader = sortableHeaders[nextIndex];
      handleSort(nextHeader);
    },
  }));

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
          <TableRow
            key={rowIndex}
            row={row}
            headers={headers}
            isFocused={rowIndex === currentFocusedRow}
            onFocus={() => handleRowFocus(rowIndex)}
            ref={(el) => (rowRefs.current[rowIndex] = el)}
          />
        ))}
      </tbody>
    </table>
  );
}

const Table = forwardRef(TableInner) as <T extends object>(
  props: TableProps<T> & { ref?: React.Ref<TableRef> }
) => ReturnType<typeof TableInner>;

export default Table;
