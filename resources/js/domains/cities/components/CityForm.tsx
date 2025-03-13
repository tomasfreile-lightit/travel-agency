import { FormField, GenericForm } from "~/shared/components/GenericForm.tsx";

interface CityFormProps {
  onSubmit: (data: { name: string }) => void;
  initialValues?: { name: string };
  isPending: boolean;
}

export const CityForm = ({
  onSubmit,
  initialValues,
  isPending,
}: CityFormProps) => {
  const fields: FormField[] = [
    {
      id: "name",
      label: "City Name",
      type: "text",
      placeholder: "Enter city name",
      required: true,
    },
  ];

  return (
    <GenericForm
      fields={fields}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isPending={isPending}
    />
  );
};
