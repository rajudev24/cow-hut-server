import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import OrderValidationsZodSchema from "./order.validation";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidationsZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), OrderController.getOrder);

export const orderRoutes = router;
