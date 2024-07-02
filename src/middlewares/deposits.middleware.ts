import { body } from "express-validator";
import { patternValidation, requestValidation } from "../validations";
import { emailPatt, isoThreePatt } from "../helpers";
import { ECurrency } from "../environments";

const verifyBody = [
    
    body('country')
        .isString()
        .notEmpty()
        .toUpperCase()
        .custom( (input) => patternValidation( input, isoThreePatt ) )
        .withMessage('Invalid country code'),

    body('currency')
        .isString()
        .notEmpty()
        .isIn( [ ECurrency.PEN, ECurrency.USD ] ),
    
    body('amount')
        .isFloat({ min: 1 })
        .notEmpty(),
    
    // body('invoice_id')
    //     .isString()
    //     .notEmpty(),

    body('user_id')
        .isString()
        .notEmpty(),

    body('payer')
        .isObject()
        .notEmpty(),
    
    body('payer.first_name')
        .isString()
        .notEmpty()
        .isLength({ max: 128 }),
    
    body('payer.last_name')
        .isString()
        .notEmpty()
        .isLength({ max: 128 }),
    
    body('payer.document')
        .isString()
        .notEmpty()
        .isLength({ max: 30 }),

    body('payer.email')
        .isString()
        .notEmpty()
        .isLength({ max: 255 })
        .custom( (input) => patternValidation( input, emailPatt ) )
        .withMessage('Invalid email customer'),

];

export const createDepositMiddleware = [
    ...verifyBody,
    requestValidation
]