import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAirline } from "~/domains/airlines/hooks";
import { useFlight } from "~/domains/flights/hooks/useFlight.tsx";
import {
  FlightFormValues,
  flightSchema,
} from "~/domains/flights/schemas/flightSchema.ts";
import { Input, Label, Message, Modal } from "~/ui";

interface FlightCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlightCreateModal = ({
  isOpen,
  onClose,
}: FlightCreateModalProps) => {
  const { mutate: createFlight } = useFlight().createFlight();
  const { data: airlinesResponse } = useAirline().getAirlines();
  const [availableCities, setAvailableCities] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FlightFormValues>({
    resolver: zodResolver(flightSchema),
  });

  const selectedAirlineId = watch("airlineId");

  // Update available cities when airline selection changes
  useEffect(() => {
    if (selectedAirlineId && airlinesResponse?.data) {
      const selectedAirline = airlinesResponse.data.find(
        (airline) => airline.id === selectedAirlineId,
      );

      if (selectedAirline?.cities) {
        setAvailableCities(selectedAirline.cities);
        setValue("originCityId", 0);
        setValue("destinationCityId", 0);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedAirlineId, airlinesResponse, setValue]);

  const onSubmit: SubmitHandler<FlightFormValues> = (data) => {
    createFlight(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal show={isOpen} title="Create Flight" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label label="Airline" htmlFor="airlineId" />
          <select
            id="airlineId"
            className={`w-full rounded border p-2 ${
              errors.airlineId ? "border-red-500" : "border-gray-300"
            }`}
            {...register("airlineId", { valueAsNumber: true })}
          >
            <option value="0">Select an airline</option>
            {airlinesResponse?.data?.map((airline) => (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            ))}
          </select>
          {errors.airlineId && <Message error={errors.airlineId?.message} />}
        </div>

        <div>
          <Label label="Origin City" htmlFor="originCityId" />
          <select
            id="originCityId"
            className={`w-full rounded border p-2 ${
              errors.originCityId ? "border-red-500" : "border-gray-300"
            }`}
            disabled={!selectedAirlineId || selectedAirlineId === 0}
            {...register("originCityId", { valueAsNumber: true })}
          >
            <option value="0">Select origin city</option>
            {availableCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.originCityId && (
            <Message error={errors.originCityId.message} />
          )}
        </div>

        <div>
          <Label label="Destination City" htmlFor="destinationCityId" />
          <select
            id="destinationCityId"
            className={`w-full rounded border p-2 ${
              errors.destinationCityId ? "border-red-500" : "border-gray-300"
            }`}
            disabled={!selectedAirlineId || selectedAirlineId === 0}
            {...register("destinationCityId", { valueAsNumber: true })}
          >
            <option value="0">Select destination city</option>
            {availableCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.destinationCityId && (
            <Message error={errors.destinationCityId?.message} />
          )}
        </div>

        <div>
          <Label label="Departure Time" htmlFor="departure" />
          <Input
            id="departure"
            type="datetime-local"
            {...register("departure")}
            error={errors.departure?.message}
          />
        </div>

        <div>
          <Label label="Arrival Time" htmlFor="arrival" />
          <Input
            id="arrival"
            type="datetime-local"
            {...register("arrival")}
            error={errors.arrival?.message}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Flight
          </button>
        </div>
      </form>
    </Modal>
  );
};
