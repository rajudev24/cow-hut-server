import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Password is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["admin"], {
      required_error: "Role Admin is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const adminLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AdminValidations = {
  createAdminZodSchema,
  adminLoginZodSchema,
};
