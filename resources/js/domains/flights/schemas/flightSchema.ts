import { z } from "zod";

export const flightSchema = z
  .object({
    airlineId: z.number().min(1, "Airline is required"),
    originCityId: z.number().min(1, "Origin city is required"),
    destinationCityId: z.number().min(1, "Destination city is required"),
    departure: z
      .string()
      .min(1, "Departure time is required")
      .refine((value) => new Date(value) > new Date(), {
        message: "Departure time must be in the future",
      }),
    arrival: z.string().min(1, "Arrival time is required"),
  })
  .superRefine((data, ctx) => {
    if (data.originCityId === data.destinationCityId) {
      ctx.addIssue({
        path: ["destinationCityId"],
        message: "Destination city must be different from origin city",
        code: "custom",
      });
    }

    if (new Date(data.arrival) <= new Date(data.departure)) {
      ctx.addIssue({
        path: ["arrival"],
        message: "Arrival time must be after departure time",
        code: "custom",
      });
    }
  });

export type FlightFormValues = z.infer<typeof flightSchema>;
