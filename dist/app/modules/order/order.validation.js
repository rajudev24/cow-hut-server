"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidationsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: "Cow ID is requierd",
        }),
        buyer: zod_1.z.string({
            required_error: "Buyer ID is requierd",
        }),
    }),
});
exports.default = OrderValidationsZodSchema;
