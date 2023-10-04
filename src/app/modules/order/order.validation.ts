import { z } from "zod";

const OrderValidationsZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: "Cow ID is requierd",
    }),
    buyer: z.string({
      required_error: "Buyer ID is requierd",
    }),
  }),
});

export default OrderValidationsZodSchema;
