import { z } from "zod";
import { zodSearchSchema } from "../schemas/zodSearchSchema";

export type ZodSearchSchemaType = z.infer<typeof zodSearchSchema>;
