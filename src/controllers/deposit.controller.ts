import { Request, Response } from "express";
import { EHttpStatus } from "../environments";
import { IDepositBody, IDepositResponse } from "../interfaces";
import axios, { AxiosError } from "axios";
import { envs } from "../config";
import { onCurrentYear, onCurrentYearIsoTwo, onGetSignature, onGetXDate } from "../helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const depositCreate = async ( req: Request, res: Response ) => {
    try {

        const requestBody = req.body as any as IDepositBody;
        const { user_id, ...body } = requestBody;

        const currentYear = onCurrentYear();
        const invoiceId = await onGetCorrelative( currentYear );

        const tuPayBody = {
            ...body,
            payment_method: "XA",
            success_url: envs.tupay_success_url,
            notification_url: envs.tupay_notification_url,
            invoice_id: invoiceId
        };

        const xDate = onGetXDate();
        const signature = onGetSignature( xDate, tuPayBody );
        
        // console.log('headers ::: ', headers);
        
        const response = await axios({
            method: 'POST',
            url: `${ envs.stg_url }/deposits`,
            headers: {
                "X-Date": xDate,
                "X-Login": envs.tupay_api_key,
                "Authorization": signature
            },
            data: tuPayBody,
        });

        const depositResponse = response.data as IDepositResponse;

        
        const { redirect_url, deposit_id, merchant_invoice_id, payment_info } = depositResponse ;

        const newDeposit = await prisma.deposit.create({
            data: {
                code: merchant_invoice_id,
                amount: payment_info.amount,
                invoiceId: deposit_id,
                currency: payment_info.currency,
                year: currentYear,
                userId: 'user-id',
                DepositRecepit: {
                    create: {
                        checkoutUrl: redirect_url,
                        expiration_date: new Date(payment_info.expiration_date),
                        payment_method: payment_info.payment_method
                    }
                }
            }
        });

        await prisma.$disconnect();

        return res.status( EHttpStatus.CREATED )
            .json( {
                newDeposit,
                redirect_url,
            } );

    } catch (error: any ) {

        const axiosError = error as AxiosError;

        console.log(axiosError.response);
        console.log(axiosError.message);
        await prisma.$disconnect();
        return res.status( axiosError.response?.status ?? 400 ).json({
            status: axiosError.response?.status,
            message: axiosError.response?.data
        });

    }
}

const onGetCorrelative = async ( currentYear: number ): Promise<string> => {

    // const currentYear = onCurrentYear();
    const currentYearIsoTwo = onCurrentYearIsoTwo();
    const counter = await prisma.deposit.count({ where: { year: currentYear } });
    const preCode = `000000${ counter + 1 }`.slice(-7)

    return `${ currentYearIsoTwo }-${ preCode }`;
}

export {
    depositCreate
};