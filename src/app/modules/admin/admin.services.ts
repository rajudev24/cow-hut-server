import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { IAdmin, ILoginAdmin, ILoginResponse } from "./admin.interface";
import { Admin } from "./admin.model";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(payload);
  return result;
};

const loginAdmin = async (payload: ILoginAdmin): Promise<ILoginResponse> => {
  const { phoneNumber, password } = payload;
  // Check Admin exist
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }
  // Macth Password
  const isPasswordMatched = await Admin.isPasswordMatched(
    password,
    isAdminExist?.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create Access Token & Refresh Token
  const { _id, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.refresh_secrect as Secret,
    config.jwt.refresh_expires_in as string
  );

  // const accessToken = jwt.sign(

  //   {
  //     id: isAdminExist?._id,
  //     role: isAdminExist.role,
  //   },
  //   config.jwt.secret as Secret,
  //   {
  //     expiresIn: config.jwt.expires_in,
  //   }
  // );

  // const refreshToken = jwt.sign(
  //   {
  //     id: isAdminExist?._id,
  //     role: isAdminExist.role,
  //   },
  //   config.jwt.refresh_secrect as Secret,
  //   {
  //     expiresIn: config.jwt.refresh_expires_in,
  //   }
  // );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
