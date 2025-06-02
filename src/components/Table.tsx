
type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

const Table = <T extends Record<string, any>>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-neutral-200 text-neutral-600">
          <tr>
            {columns.map((col, colIndex) => (
              <th key={colIndex} className="px-4 py-2 border-b-2 border-neutral-400">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-neutral-200">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border-b border-neutral-300 text-neutral-800 font-bold">
                  {col.cell ? col.cell(row) : String(row[col.accessor!])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table