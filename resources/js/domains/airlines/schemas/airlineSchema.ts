import { z } from "zod";

export const airlineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cities: z.array(z.number()).min(1, "At least one city is required"),
});

export type AirlineFormValues = z.infer<typeof airlineSchema>;
