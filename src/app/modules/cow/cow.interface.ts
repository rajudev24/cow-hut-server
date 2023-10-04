import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type Location =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

export type CowBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type CowCategory = "Dairy" | "Beef" | "Dual Purpose";

export interface ICow {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: CowBreed;
  weight: number;
  label: string;
  category: CowCategory;
  seller: Types.ObjectId | IUser;
}

export type ICowFilters = {
  searchTerm?: string;
  minPrice?:number;
  maxPrice?:number
};

export type CowModel = Model<ICow, Record<string, unknown>>;
