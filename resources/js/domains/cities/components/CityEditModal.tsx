import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { City } from "~/api/cities";
import { useCity } from "~/domains/cities/hooks";
import {
  CityFormValues,
  citySchema,
} from "~/domains/cities/schemas/citySchema.ts";
import { Input, Label, Modal } from "~/ui";

interface CityEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: City;
}

export const CityEditModal = ({
  isOpen,
  onClose,
  city,
}: CityEditModalProps) => {
  const { mutate: updateCity } = useCity().editCity();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: city,
  });

  const onSubmit: SubmitHandler<CityFormValues> = (data) => {
    updateCity(
      { id: city.id, ...data },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal show={isOpen} title="Edit City" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label label="City Name" htmlFor="name" />
          <Input
            id="name"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Enter city name"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Update City
          </button>
        </div>
      </form>
    </Modal>
  );
};
