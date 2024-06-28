import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { EHttpStatus } from '../environments';

const requestValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status( EHttpStatus.UNPROCCESABLE_ENTITY ).json({
      message: 'Los campos enviados no son válidos',
      errors: errors.array(),
    });
  }
  next();
};

export {
  requestValidation
};
