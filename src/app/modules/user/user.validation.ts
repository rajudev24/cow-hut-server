import { z } from "zod";
import { userRole } from "./user.constants";

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
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
    budget: z.number({
      required_error: "Budget is required",
    }),
    income: z.number({
      required_error: "Income is required",
    }),
  }),
});

const updateSinleUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: "Phone Number is required",
      })
      .optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .optional(),
    role: z
      .enum([...userRole] as [string, ...string[]], {
        required_error: "Role is required",
      })
      .optional(),
    name: z.object({
      firstName: z
        .string({
          required_error: "First Name is required",
        })
        .optional(),
      lastName: z
        .string({
          required_error: "Last Name is required",
        })
        .optional(),
    }),
    address: z
      .string({
        required_error: "Address is required",
      })
      .optional(),
    budget: z
      .number({
        required_error: "Budget is required",
      })
      .optional(),
    income: z
      .number({
        required_error: "Income is required",
      })
      .optional(),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateSinleUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
