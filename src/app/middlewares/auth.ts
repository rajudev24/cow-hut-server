import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get Token from req headers

      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized");
      }

      let verfiedToken = null;
      verfiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.user = verfiedToken;

      if (roles.length && !roles.includes(verfiedToken.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Fobidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
