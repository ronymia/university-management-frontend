import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "roomNumber is required"),
  floor: z.string().min(1, "floor is required"),
  buildingId: z.string().min(1, "buildingId is required"),
});
