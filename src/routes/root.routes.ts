import { Router } from "express";
import userRouter from "./user.routes";
import depositRouter from "./deposit.routes";
import hooksRouter from "./hooks.routes";
import retreatRouter from "./retreat.routes";

const rootRouter = Router();
const prefix = '/api/v1';

rootRouter.use( prefix, userRouter );
rootRouter.use( prefix, depositRouter );
rootRouter.use( prefix, retreatRouter );
rootRouter.use( prefix, hooksRouter );


export default rootRouter;
