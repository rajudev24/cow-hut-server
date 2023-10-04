import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
const router = express.Router();

// User Routes

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  "/:id",
  validateRequest(UserValidation.updateSinleUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
