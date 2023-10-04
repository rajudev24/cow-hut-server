import { CowModel, ICow } from "./cow.interface";
import { cowBreeds, cowCategories, location } from "./cow.constants";
import { Schema, model } from "mongoose";

const CowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: location },
    breed: { type: String, required: true, enum: cowBreeds },
    weight: { type: Number, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true, enum: cowCategories },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>("Cow", CowSchema);
