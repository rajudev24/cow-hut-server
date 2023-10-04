import express from "express";
import { AuthRoutes } from "../modules/user/auth.route";
import { UserRoutes } from "../modules/user/user.routes";
import { CowRoutes } from "../modules/cow/cow.route";
import { orderRoutes } from "../modules/order/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

// Applications Routes

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
