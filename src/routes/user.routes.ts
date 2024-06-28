import { Router } from "express";
import * as routes from "../controllers/user.controller";

const userRouter = Router();

userRouter.post( '/user', routes.userCreate );
userRouter.get( '/user', routes.userFindAll );

export default userRouter;