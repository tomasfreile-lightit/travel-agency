import { FormField, GenericForm } from "~/shared/components/GenericForm.tsx";

interface AirlineFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  initialValues?: { name: string; description: string };
  isPending: boolean;
}

export const AirlineForm = ({
  onSubmit,
  initialValues,
  isPending,
}: AirlineFormProps) => {
  const fields: FormField[] = [
    {
      id: "name",
      label: "Airline Name",
      type: "text",
      placeholder: "Enter airline name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter airline description",
      required: false,
    },
  ];

  return (
    <GenericForm<{ name: string; description: string }>
      fields={fields}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isPending={isPending}
    />
  );
};
