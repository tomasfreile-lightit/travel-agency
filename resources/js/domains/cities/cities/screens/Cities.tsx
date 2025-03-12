import { useState } from "react";

import { useCity } from "~/domains/cities/hooks";
import { Table } from "~/ui/table";

export const Cities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Default page size

  const { data: citiesResponse, isLoading } = useCity().getCities(
    currentPage,
    pageSize,
  );

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const cities = citiesResponse?.data || [];
  const pagination = citiesResponse?.pagination;

  return (
    <div className="p-6">
      <Table columns={columns} data={cities} />
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
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
              currentPage === pagination.totalPages
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
