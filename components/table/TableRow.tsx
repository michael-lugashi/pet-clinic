import { forwardRef } from "react";
import type { Header } from "./table";

type TableRowProps<T> = {
  row: T;
  headers: Header<T>[];
  isFocused?: boolean;
  onFocus?: () => void;
};

function TableRowInner<T extends object>(
  { row, headers, isFocused = false, onFocus }: TableRowProps<T>,
  ref: React.Ref<HTMLTableRowElement>
) {
  return (
    <tr
      ref={ref}
      className={`transition-colors cursor-pointer ${
        isFocused ? "ring-2 ring-dark-purple ring-inset" : "hover:bg-gray/5"
      }`}
      onClick={onFocus}
      tabIndex={isFocused ? 0 : -1}
    >
      {headers.map((header, index) => {
        const value = row[header.key];
        return (
          <td key={String(header.key)} className="py-3 px-4 border-b border-black/10">
            {header.displayFn ? header.displayFn(value, row, header.key) : String(value ?? "")}
          </td>
        );
      })}
    </tr>
  );
}

const TableRow = forwardRef(TableRowInner) as <T extends object>(
  props: TableRowProps<T> & { ref?: React.Ref<HTMLTableRowElement> }
) => ReturnType<typeof TableRowInner>;

export default TableRow;
