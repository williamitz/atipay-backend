import { Request, Response } from "express";
import { EHttpStatus } from "../environments";
import { IDepositResponse, IRereatResponse, IRetreatBody } from "../interfaces";
import axios, { AxiosError } from "axios";
import { envs } from "../config";
import { onCurrentYear, onCurrentYearIsoTwo, onGetSignature, onGetSignatureRetreats, onGetXDate } from "../helpers";
import { AccountType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const retreatCreate = async ( req: Request, res: Response ) => {
    try {

        const requestBody = req.body as any as IRetreatBody;
        const { user_id, ...body } = requestBody;

        const currentYear = onCurrentYear();
        const codeCorrelative = await onGetCorrelative( currentYear );

        const tuPayBody = {
            ...body,
            login: envs.tupay_retreats_api_key,
            pass: envs.tupay_retreats_api_signature,
            external_id: codeCorrelative,
            // success_url: envs.tupay_success_url,
            notification_url: envs.tupay_retreats_notification_url,
        };

        const signature = onGetSignatureRetreats( tuPayBody );

        
        const response = await axios({
            method: 'POST',
            url: `${ envs.stg_url }/cashout`,
            headers: {
                "Payload-Signature": signature,
            },
            data: tuPayBody,
        });

        const depositResponse = response.data as IRereatResponse;
        
        const { cashout_id } = depositResponse ;


        const newDeposit = await prisma.retreat.create({
            data: {
                code: codeCorrelative,
                amount: body.amount,
                currency: body.currency,
                bank_account: body.bank_account,
                account_type: body.account_type as AccountType,
                beneficiary_name: `${ body.beneficiary_name } ${ body.beneficiary_lastname }`,
                documentType: body.document_type,
                documentId: body.document_id,
                cashout_id: cashout_id,
                year: currentYear,
                userId: 'user-id',
            }
        });

        await prisma.$disconnect();

        return res.status( EHttpStatus.CREATED )
            .json( newDeposit );

    } catch (error: any ) {

        const axiosError = error as AxiosError;

        console.log(axiosError.response?.data);
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
    const counter = await prisma.retreat.count({ where: { year: currentYear } });
    const preCode = `000000${ counter + 1 }`.slice(-7)

    return `${ currentYearIsoTwo.slice(-2) }-${ preCode }`;
}

export {
    retreatCreate
}