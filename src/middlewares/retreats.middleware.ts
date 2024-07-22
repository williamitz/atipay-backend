import { body } from "express-validator";
import { requestValidation } from "../validations";
import { bankAccountPath, isoThreePatt } from "../helpers";
import { ECurrency } from "../environments";
import { EAccountType, documentsValid } from "../types";

const verifyBody = [
    
    body('bank_account')
        .isString()
        .matches( bankAccountPath ).withMessage("Solo se aceptan números")
        .notEmpty(),

    body('account_type')
        .isString()
        .isIn([ EAccountType.S, EAccountType.C ]).withMessage("El tipo de cuenta debe ser S -> cuenta de ahorros o C -> cuenta corriente")
        .notEmpty(),

    body('country')
        .isString()
        .notEmpty()
        .toUpperCase()
        .matches( isoThreePatt ).withMessage("Código de país inválido")
        .withMessage('Invalid country code'),

    body('currency')
        .isString()
        .notEmpty()
        .isIn( [ ECurrency.PEN, ECurrency.USD ] ),
    
    body('amount')
        .isFloat({ min: 1 })
        .notEmpty(),

    body('document_type')
        .isString()
        .notEmpty()
        .isIn( documentsValid ).withMessage(`Tipo de documento inválido, ejm: ${ documentsValid.join(', ') }`)
        .isLength({ max: 4 }),

    body('document_id')
        .isString()
        .notEmpty()
        .isLength({ max: 20 }),
        
    body('beneficiary_name')
        .isString()
        .notEmpty()
        .isLength({ max: 100 }),
    
    body('beneficiary_lastname')
        .isString()
        .notEmpty()
        .isLength({ max: 100 }),

    body('user_id')
        .isString()
        .notEmpty(),

];

export const createRetreatMiddleware = [
    ...verifyBody,
    requestValidation
]