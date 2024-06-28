import { Router } from "express";
import userRouter from "./user.routes";
import depositRouter from "./deposit.routes";

const rootRouter = Router();
const prefix = '/api/v1';

rootRouter.use( prefix, userRouter );
rootRouter.use( prefix, depositRouter );

export default rootRouter;
