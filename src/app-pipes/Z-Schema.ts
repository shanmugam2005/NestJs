import { z } from "zod";

export const schema=z
.object({
    name:z.string(),
    Age:z.number()
})
.required();

export type studentsSchema=z.infer<typeof schema>