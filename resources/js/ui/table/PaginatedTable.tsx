import React from "react";

import { ServicePagination } from "~/api";

interface Column {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  pagination: ServicePagination | undefined;
  setCurrentPage: (p: number) => void;
}

export const PaginatedTable = ({
  columns,
  data,
  pagination,
  setCurrentPage,
}: TableProps) => {
  const totalPages = pagination?.totalPages ?? 0;
  const currentPage = pagination?.currentPage ?? 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
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
                    {column.render ? column.render(row) : row[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
