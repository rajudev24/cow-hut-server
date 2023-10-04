"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        role: zod_1.z.enum([...user_constants_1.userRole], {
            required_error: "Role is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        budget: zod_1.z.number({
            required_error: "Budget is required",
        }),
        income: zod_1.z.number({
            required_error: "Income is required",
        }),
    }),
});
const updateSinleUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone Number is required",
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .optional(),
        role: zod_1.z
            .enum([...user_constants_1.userRole], {
            required_error: "Role is required",
        })
            .optional(),
        name: zod_1.z.object({
            firstName: zod_1.z
                .string({
                required_error: "First Name is required",
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: "Last Name is required",
            })
                .optional(),
        }),
        address: zod_1.z
            .string({
            required_error: "Address is required",
        })
            .optional(),
        budget: zod_1.z
            .number({
            required_error: "Budget is required",
        })
            .optional(),
        income: zod_1.z
            .number({
            required_error: "Income is required",
        })
            .optional(),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateSinleUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
};
