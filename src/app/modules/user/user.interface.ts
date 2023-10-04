import mongoose, { Model } from "mongoose";

export type IRole = "seller" | "buyer";

type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: mongoose.ObjectId;
  phoneNumber: string;
  role: IRole;
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export interface ILoginUser {
  phoneNumber: string;
  password: string;
}
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// Static Method
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, "password" | "role" | "_id">>;
  isPasswordMatched(
    currentPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
