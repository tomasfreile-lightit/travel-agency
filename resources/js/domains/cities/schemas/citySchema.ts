import { z } from "zod";

export const citySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CityFormValues = z.infer<typeof citySchema>;
