import { useState } from "react";

import { useAirline } from "~/domains/airlines/hooks";
import { PaginatedTable } from "~/ui/table";

export const Airlines = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: airlinesResponse, isLoading } = useAirline().getAirlines(
    currentPage,
    pageSize,
  );

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "number_of_flights", label: "Number of Flights" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const airlines = airlinesResponse?.data || [];
  const pagination = airlinesResponse?.pagination;

  return (
    <div className="p-6">
      <PaginatedTable
        columns={columns}
        data={airlines}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
