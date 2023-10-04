import { CowBreed, CowCategory, Location } from "./cow.interface";

export const location: Location[] = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
];

export const cowBreeds: CowBreed[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const cowCategories: CowCategory[] = ["Dairy", "Beef", "Dual Purpose"];

export const cowSearchOptions = ["location", "breed", "category"];

export const filterAbleFileds = [
  "searchTerm",
  "location",
  "breed",
  "category",
  "minPrice",
  "maxPrice",
];
