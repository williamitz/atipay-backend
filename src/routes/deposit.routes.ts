import { Router } from "express";
import * as actions from "../controllers/deposit.controller";
import { createDepositMiddleware } from "../middlewares";

const depositRouter = Router();

depositRouter.post( '/deposit', createDepositMiddleware, actions.depositCreate );

export default depositRouter;