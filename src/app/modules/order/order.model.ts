import { Schema, model } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const OrderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>("Order", OrderSchema);
