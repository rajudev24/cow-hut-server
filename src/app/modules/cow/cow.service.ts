import { SortOrder } from "mongoose";
import calculatePagination from "../../../helpers/paginationHelper";
import { IGenericPaginationResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { cowSearchOptions } from "./cow.constants";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cow.create(payload);
  return result;
};
const getAllCow = async (
  paginationOptions: IPaginationOptions,
  filters: ICowFilters
): Promise<IGenericPaginationResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchOptions.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceCondition: any = {};
    if (minPrice !== undefined) {
      priceCondition.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      priceCondition.$lte = maxPrice;
    }
    andConditions.push({ price: priceCondition });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};
const updateSingleCow = async (id: string, payload: Partial<ICow>) => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};
export const CowServices = {
  createCow,
  getAllCow,
  getSingleCow,
  updateSingleCow,
  deleteCow,
};
