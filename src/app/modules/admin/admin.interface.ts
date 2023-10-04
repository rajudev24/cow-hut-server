import mongoose, { Model } from "mongoose";

export interface IAdmin {
  _id: mongoose.ObjectId;
  phoneNumber: string;
  role: "admin";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
}

export interface ILoginAdmin {
  phoneNumber: string;
  password: string;
}

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

// Static Method
export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, "password" | "role" | "_id">>;
  isPasswordMatched(
    currentPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
