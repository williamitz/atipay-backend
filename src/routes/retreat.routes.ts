import { Router } from "express";
import * as actions from "../controllers/retreat.controller";
import { createRetreatMiddleware } from "../middlewares";

const retreatRouter = Router();

retreatRouter.post( '/retreat', createRetreatMiddleware, actions.retreatCreate );

export default retreatRouter;