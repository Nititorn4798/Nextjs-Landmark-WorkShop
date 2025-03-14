import { z, ZodSchema, SafeParseReturnType } from "zod";

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

const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return file.size <= maxFileSize;
  }, "File Size Must be less than 1 MB");
};

export const imageSchema = z.object({
  image: validateImage(),
});

export const imageSchemaV2 = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      return file.size <= 10 * 1024 * 1024; // 10MB
    }, "File size must be less than 10MB")
    .refine((file) => {
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }, "Only .jpg, .png, and .webp formats are supported."),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อ อักขระต้องการมากกว่า 2 อักขระ" })
    .max(30, { message: "ชื่อ อักขระต้องการสูงสุด 30 อักขระ" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "รายละเอียด อักขระต้องการมากกว่า 2 อักขระ" })
    .max(2000, { message: "รายละเอียด อักขระต้องการสูงสุด 2000 อักขระ" }),
  price: z.coerce.number().int().min(0, { message: "ราคาต้องมากกว่า 0" }),
  provinces: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
}

export const validateWithZodV2 = <T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> => {
  const result: SafeParseReturnType<unknown, T> = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    return {
      success: false,
      error: { message: errors.join(", ") },
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
