import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

const roleEnum = ["seller", "buyer"];

export const UserSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 1,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roleEnum,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
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

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, "password"> | null> {
  return await User.findOne({ phoneNumber }, { password: 1, role: 1, _id: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  currentPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, savedPassword);
};

UserSchema.pre("save", async function (next) {
  // Hashing User Poassword
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
