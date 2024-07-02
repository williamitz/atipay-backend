import { Request, Response } from "express";
import { EHttpStatus } from "../environments";
import { IDepositBody, IDepositResponse } from "../interfaces";
import axios, { AxiosError } from "axios";
import { envs } from "../config";
import { onGetSignature, onGetXDate } from "../helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const depositCreate = async ( req: Request, res: Response ) => {
    try {

        const body = req.body as any as IDepositBody;

        const requestBody = {
            ...body,
            payment_method: "XA",
            success_url: envs.tupay_success_url,
            notification_url: envs.tupay_notification_url
        };

        const xDate = onGetXDate();
        const signature = onGetSignature( xDate, requestBody );
        
        // console.log('headers ::: ', headers);
        
        const response = await axios({
            method: 'POST',
            url: `${ envs.stg_url }/deposits`,
            headers: {
                "X-Date": xDate,
                "X-Login": envs.tupay_api_key,
                "Authorization": signature
            },
            data: requestBody,
        });

        const depositResponse = response.data as IDepositResponse;

        
        const { redirect_url, deposit_id, merchant_invoice_id, payment_info } = depositResponse ;

        const newDeposit = await prisma.deposit.create({
            data: {
                amount: payment_info.amount,
                apiDepositId: deposit_id,
                currency: payment_info.currency,
                userId: merchant_invoice_id,
                DepositRecepit: {
                    create: {
                        checkoutUrl: redirect_url,
                        expiration_date: new Date(payment_info.expiration_date),
                        payment_method: payment_info.payment_method
                    }
                },
                DepositPaymentsMethods: {
                    create: payment_info.multigateway_metadata.map( (e) => ({
                        reference: e.reference,
                        paymentMethodType: e.paymentMethodType,
                        paymentMethodCode: e.paymentMethodCode,
                        agreement: e.agreement,
                        beneficiaryName: e.beneficiaryName,
                        payerName: e.payerName,
                        paymentMethodName: e.paymentMethodName,
                        qrCode: e.qrCode,
                        redirectUrl: e.redirectUrl,
                        subType: e.subType
                    }) )
                }
                
            }
        });

        await prisma.$disconnect();

        return res.status( EHttpStatus.CREATED )
            .json( newDeposit );

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

export {
    depositCreate
};