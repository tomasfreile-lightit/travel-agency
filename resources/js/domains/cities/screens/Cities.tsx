import { useState } from "react";

import { City } from "~/api/cities";
import { CityCreateModal } from "~/domains/cities/components/CityCreateModal.tsx";
import { CityEditModal } from "~/domains/cities/components/CityEditModal.tsx";
import { useCity } from "~/domains/cities/hooks";
import { PaginatedTable } from "~/ui/table";

export const Cities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const { data: citiesResponse, isLoading } = useCity().getCities(
    currentPage,
    pageSize,
  );

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "incoming_flights", label: "Incoming Flights" },
    { id: "outgoing_flights", label: "Outgoing Flights" },
    {
      id: "actions",
      label: "Actions",
      render: (city: City) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditCity(city)}
            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteCity(city.id)}
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditCity = (city: City) => {
    setSelectedCity(city);
    setIsEditModalOpen(true);
  };

  const { mutate: deleteCity } = useCity().deleteCity();

  const handleDeleteCity = (id: number) => {
    deleteCity(id);
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
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Cities</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add City
        </button>
      </div>

      <PaginatedTable
        columns={columns}
        data={cities}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />

      <CityCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedCity && (
        <CityEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCity(null);
          }}
          city={selectedCity}
        />
      )}
    </div>
  );
};
