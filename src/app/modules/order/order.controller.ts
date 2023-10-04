import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IOrder } from "./order.interface";
import httpStatus from "http-status";
import sendresponse from "../../../shared/sendResponse";
import { OrderServices } from "./order.service";
import { ICow } from "../cow/cow.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;
  const result = await OrderServices.createOrder(cow, buyer);

  sendresponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order placed have been successfully done !",
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getOrder();

  sendresponse<object[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retirve successfully done !",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrder,
};
