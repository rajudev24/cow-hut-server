"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = __importDefault(require("./order.validation"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(order_validation_1.default), (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), order_controller_1.OrderController.getOrder);
exports.orderRoutes = router;
