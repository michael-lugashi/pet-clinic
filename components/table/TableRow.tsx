import type { Header } from "./table";

type TableRowProps<T> = {
  row: T;
  headers: Header<T>[];
};

const TableRow = <T extends object>({ row, headers }: TableRowProps<T>) => {
  return (
    <tr className="hover:bg-gray/5 transition-colors">
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
};

export default TableRow;
