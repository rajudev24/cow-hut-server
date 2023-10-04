"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const cow_constants_1 = require("./cow.constants");
const mongoose_1 = require("mongoose");
const CowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: cow_constants_1.location },
    breed: { type: String, required: true, enum: cow_constants_1.cowBreeds },
    weight: { type: Number, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true, enum: cow_constants_1.cowCategories },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)("Cow", CowSchema);
