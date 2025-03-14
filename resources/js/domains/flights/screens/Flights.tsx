import { useState } from "react";

import { Flight } from "~/api/flights.ts";
import { FlightCreateModal } from "~/domains/flights/components/FlightCreateModal.tsx";
import { useFlight } from "~/domains/flights/hooks/useFlight.tsx";
import { PaginatedTable } from "~/ui/table";

export const Flights = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: flightsResponse, isLoading } = useFlight().getFlights(
    currentPage,
    pageSize,
  );

  const columns = [
    { id: "id", label: "ID" },
    {
      id: "airline",
      label: "Airline",
      render: (flight: Flight) => flight.airline?.name || "N/A",
    },
    {
      id: "originCity",
      label: "Origin City",
      render: (flight: Flight) => flight.originCity?.name || "N/A",
    },
    {
      id: "destinationCity",
      label: "Destination City",
      render: (flight: Flight) => flight.destinationCity?.name || "N/A",
    },
    {
      id: "departure",
      label: "Departure",
      render: (flight: Flight) => new Date(flight.departure).toLocaleString(),
    },
    {
      id: "arrival",
      label: "Arrival",
      render: (flight: Flight) => new Date(flight.arrival).toLocaleString(),
    },
    {
      id: "actions",
      label: "Actions",
      render: (flight: Flight) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleDeleteFlight(flight.id)}
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const { mutate: deleteFlight } = useFlight().deleteFlight();

  const handleDeleteFlight = (id: number) => {
    deleteFlight(id);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const flights = flightsResponse?.data || [];
  const pagination = flightsResponse?.pagination;

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Flights</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add Flight
        </button>
      </div>

      <PaginatedTable
        columns={columns}
        data={flights}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />

      <FlightCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
