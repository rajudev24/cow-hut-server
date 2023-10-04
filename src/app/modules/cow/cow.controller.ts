import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendresponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { CowServices } from "./cow.service";
import { ICow } from "./cow.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { filterAbleFileds } from "./cow.constants";

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowdata } = req.body;
  const result = await CowServices.createCow(cowdata);

  sendresponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created successfully",
    data: result,
  });
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, filterAbleFileds);

  const result = await CowServices.getAllCow(paginationOptions, filters);
  sendresponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows Retrive successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowServices.getSingleCow(id);

  sendresponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Retrive successfully",
    data: result,
  });
});

const updateSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CowServices.updateSingleCow(id, updatedData);
  sendresponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully",
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowServices.deleteCow(id);

  sendresponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateSingleCow,
  deleteCow,
};
