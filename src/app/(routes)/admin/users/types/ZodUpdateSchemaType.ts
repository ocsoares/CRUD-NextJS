import { z } from "zod";
import { zodUpdateSchema } from "../schemas/zodUpdateSchema";

export type ZodUpdateSchemaType = z.infer<typeof zodUpdateSchema>;
