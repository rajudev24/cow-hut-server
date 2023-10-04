import express from "express";
import { CowController } from "./cow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CowValidations } from "./cow.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
const router = express.Router();

router.post(
  "/",
  validateRequest(CowValidations.CowValidationZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getAllCow
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getSingleCow
);
router.patch(
  "/:id",
  validateRequest(CowValidations.UpdateCowValidationZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateSingleCow
);
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
