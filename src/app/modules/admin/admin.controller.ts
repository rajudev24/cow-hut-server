import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendresponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AdminService } from "./admin.services";
import { ILoginResponse } from "./admin.interface";
import config from "../../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);

  sendresponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendresponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Login successfully",
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
