import mongoose from "mongoose";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { Order } from "./order.model";
import { IOrder } from "./order.interface";
import { ICow } from "../cow/cow.interface";
import { IUser } from "../user/user.interface";

const createOrder = async (cowId: string, buyerId: string): Promise<void> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cow = await Cow.findById(cowId).session(session);
    const buyer = await User.findById(buyerId).session(session);
    const seller = await User.findOne(cow?.seller).session(session);

    if (!cow || !buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Cow or buyer not found");
    }

    if (buyer.budget < cow.price) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Insufficient funds");
    }
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, "Seller not Found");
    }

    cow.label = "sold out";
    buyer.budget -= cow.price;
    seller.income += cow.price;

    await cow.save();
    await buyer.save();
    await seller.save();

    const orderData = {
      cow: cow._id,
      buyer: buyer._id,
    };
    const order = (await Order.create(orderData)).$session(session);
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getOrder = async (): Promise<object[] | null> => {
  const result = await Order.find();

  const orders: object[] = [];

  for (let i = 0; i < result.length; i++) {
    const cowId = result[i].cow;
    const buyerId = result[i].buyer;

    const cow = await Cow.findById(cowId);
    const buyer = await User.findById(buyerId);

    if (cow && buyer) {
      const order = {
        cowData: cow.toObject(),
        buyerData: buyer.toObject(),
      };

      orders.push(order);
    }
  }

  const data: object[] = [
    {
      orders: orders,
    },
  ];

  return data;
};

export const OrderServices = {
  createOrder,
  getOrder,
};
