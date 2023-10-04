"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const order_model_1 = require("./order.model");
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cow = yield cow_model_1.Cow.findById(cowId).session(session);
        const buyer = yield user_model_1.User.findById(buyerId).session(session);
        const seller = yield user_model_1.User.findOne(cow === null || cow === void 0 ? void 0 : cow.seller).session(session);
        if (!cow || !buyer) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Cow or buyer not found");
        }
        if (buyer.budget < cow.price) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_ACCEPTABLE, "Insufficient funds");
        }
        if (!seller) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Seller not Found");
        }
        cow.label = "sold out";
        buyer.budget -= cow.price;
        seller.income += cow.price;
        yield cow.save();
        yield buyer.save();
        yield seller.save();
        const orderData = {
            cow: cow._id,
            buyer: buyer._id,
        };
        const order = (yield order_model_1.Order.create(orderData)).$session(session);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    const orders = [];
    for (let i = 0; i < result.length; i++) {
        const cowId = result[i].cow;
        const buyerId = result[i].buyer;
        const cow = yield cow_model_1.Cow.findById(cowId);
        const buyer = yield user_model_1.User.findById(buyerId);
        if (cow && buyer) {
            const order = {
                cowData: cow.toObject(),
                buyerData: buyer.toObject(),
            };
            orders.push(order);
        }
    }
    const data = [
        {
            orders: orders,
        },
    ];
    return data;
});
exports.OrderServices = {
    createOrder,
    getOrder,
};
