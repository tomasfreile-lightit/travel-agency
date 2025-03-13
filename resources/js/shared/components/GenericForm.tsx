import { useState } from "react";

export interface FormField {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface GenericFormProps<T> {
  fields: FormField[];
  onSubmit: (data: T) => void;
  initialValues?: Partial<T>;
  isPending: boolean;
}

export const GenericForm = <T extends Record<string, any>>({
  fields,
  onSubmit,
  initialValues,
  isPending,
}: GenericFormProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(initialValues || {});

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : (
            <input
              type={field.type || "text"}
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
