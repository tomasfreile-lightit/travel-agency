import { useState } from "react";

import { Airline } from "~/api/airlines.ts";
import { AirlineCreateModal } from "~/domains/airlines/components/AirlineCreateModal.tsx";
import { AirlineEditModal } from "~/domains/airlines/components/AirlineEditModal.tsx";
import { useAirline } from "~/domains/airlines/hooks";
import { PaginatedTable } from "~/ui/table";

export const Airlines = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);

  const { data: airlinesResponse, isLoading } = useAirline().getAirlines(
    currentPage,
    pageSize,
  );

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "number_of_flights", label: "Number of Flights" },
    {
      id: "actions",
      label: "Actions",
      render: (airline: Airline) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditAirline(airline)}
            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAirline(airline.id)}
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditAirline = (airline: Airline) => {
    setSelectedAirline(airline);
    setIsEditModalOpen(true);
  };

  const { mutate: deleteAirline } = useAirline().deleteAirline();

  const handleDeleteAirline = (id: number) => {
    deleteAirline(id);
  };

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
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Airlines</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add Airline
        </button>
      </div>

      <PaginatedTable
        columns={columns}
        data={airlines}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />

      <AirlineCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedAirline && (
        <AirlineEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedAirline(null);
          }}
          airline={selectedAirline}
        />
      )}
    </div>
  );
};
