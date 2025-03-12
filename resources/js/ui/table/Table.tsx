import React from "react";

interface Column {
  id: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors duration-200 hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-6 py-4 text-sm whitespace-nowrap text-gray-900"
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
