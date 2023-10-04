import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminZodSchema),
  AdminController.createAdmin
);
router.post(
  "/login",
  validateRequest(AdminValidations.adminLoginZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
