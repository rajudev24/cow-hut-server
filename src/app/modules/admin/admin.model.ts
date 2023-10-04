import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const AdminSchema = new Schema<IAdmin>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["admin"] },
    password: { type: String, required: true, select: 0 },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, "password"> | null> {
  return await Admin.findOne({ phoneNumber }, { password: 1, role: 1, _id: 1 });
};
AdminSchema.statics.isPasswordMatched = async function (
  currentPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, savedPassword);
};

AdminSchema.pre("save", async function (next) {
  // Hashing User Poassword
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
