import { z } from "zod";

export const buildingSchema = z.object({
  title: z.string().min(1, "Title is required"),
});
