import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "firstName อักขระต้องการมากกว่า 2 อักขระ" }),
  lastname: z
    .string()
    .min(2, { message: "lastName อักขระต้องการมากกว่า 2 อักขระ" }),
  username: z
    .string()
    .min(2, { message: "userName อักขระต้องการมากกว่า 2 อักขระ" }),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
