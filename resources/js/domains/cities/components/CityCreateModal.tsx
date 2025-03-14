import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCity } from "~/domains/cities/hooks";
import {
  CityFormValues,
  citySchema,
} from "~/domains/cities/schemas/citySchema.ts";
import { Input, Label, Modal } from "~/ui";

interface CityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CityCreateModal = ({ isOpen, onClose }: CityCreateModalProps) => {
  const { mutate: createCity } = useCity().createCity();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
  });

  const onSubmit: SubmitHandler<CityFormValues> = (data) => {
    createCity(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal show={isOpen} title="Add City" onClose={onClose}>
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
            Create City
          </button>
        </div>
      </form>
    </Modal>
  );
};
