import { z } from "zod";
import { cowBreeds, cowCategories, location } from "./cow.constants";

const CowValidationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is requierd",
    }),
    age: z.number({
      required_error: "Age is requierd",
    }),
    price: z.number({
      required_error: "Price is requierd",
    }),
    location: z.enum([...location] as [string, ...string[]]),
    breed: z.enum([...cowBreeds] as [string, ...string[]]),
    weight: z.number({
      required_error: "Weight is requierd",
    }),
    label: z.string({
      required_error: "Label is requierd",
    }),
    category: z.enum([...cowCategories] as [string, ...string[]]),
    seller: z.string({
      required_error: "Seller is requierd",
    }),
  }),
});

const UpdateCowValidationZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is requierd",
      })
      .optional(),
    age: z
      .number({
        required_error: "Age is requierd",
      })
      .optional(),
    price: z
      .number({
        required_error: "Price is requierd",
      })
      .optional(),
    location: z.enum([...location] as [string, ...string[]]),
    breed: z.enum([...cowBreeds] as [string, ...string[]]),
    weight: z
      .number({
        required_error: "Weight is requierd",
      })
      .optional(),
    label: z
      .string({
        required_error: "Label is requierd",
      })
      .optional(),
    category: z.enum([...cowCategories] as [string, ...string[]]),
    seller: z
      .string({
        required_error: "Seller is requierd",
      })
      .optional(),
  }),
});

export const CowValidations = {
  CowValidationZodSchema,
  UpdateCowValidationZodSchema,
};
