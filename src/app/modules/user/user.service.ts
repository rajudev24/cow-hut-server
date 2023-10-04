import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
  IUser,
} from "./user.interface";
import { User } from "./user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const updateSingleUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { phoneNumber, password } = payload;
  // Check user exist
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  // Macth Password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create Access Token & Refresh Token
  const { _id, role } = isUserExist;
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

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secrect as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Token");
  }
  const { _id } = verifiedToken;
  const isUserExist = await User.findOne({ _id });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, " User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  refreshToken,
};
