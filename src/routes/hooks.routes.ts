

import { Router } from "express";
import * as actions from "../controllers/hooks.controller";

const hooksRouter = Router();

hooksRouter.post( '/deposit-webhook', [], actions.webHook );

export default hooksRouter;