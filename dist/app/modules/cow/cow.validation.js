"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidations = void 0;
const zod_1 = require("zod");
const cow_constants_1 = require("./cow.constants");
const CowValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is requierd",
        }),
        age: zod_1.z.number({
            required_error: "Age is requierd",
        }),
        price: zod_1.z.number({
            required_error: "Price is requierd",
        }),
        location: zod_1.z.enum([...cow_constants_1.location]),
        breed: zod_1.z.enum([...cow_constants_1.cowBreeds]),
        weight: zod_1.z.number({
            required_error: "Weight is requierd",
        }),
        label: zod_1.z.string({
            required_error: "Label is requierd",
        }),
        category: zod_1.z.enum([...cow_constants_1.cowCategories]),
        seller: zod_1.z.string({
            required_error: "Seller is requierd",
        }),
    }),
});
const UpdateCowValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is requierd",
        })
            .optional(),
        age: zod_1.z
            .number({
            required_error: "Age is requierd",
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Price is requierd",
        })
            .optional(),
        location: zod_1.z.enum([...cow_constants_1.location]),
        breed: zod_1.z.enum([...cow_constants_1.cowBreeds]),
        weight: zod_1.z
            .number({
            required_error: "Weight is requierd",
        })
            .optional(),
        label: zod_1.z
            .string({
            required_error: "Label is requierd",
        })
            .optional(),
        category: zod_1.z.enum([...cow_constants_1.cowCategories]),
        seller: zod_1.z
            .string({
            required_error: "Seller is requierd",
        })
            .optional(),
    }),
});
exports.CowValidations = {
    CowValidationZodSchema,
    UpdateCowValidationZodSchema,
};
