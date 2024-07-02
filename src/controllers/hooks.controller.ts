import { Request, Response } from "express";
import { EHttpStatus } from "../environments";
import { IBodyConfirm } from "../interfaces";
import { DepositStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const webHook = async ( req: Request, res: Response ) => {
    try {

        // console.log('Llamada a web hook req.body ::: ✅ ', req.body);
        // { deposit_id: 301404615 } -> body

        const { deposit_id } = req.body as any as IBodyConfirm;

        const depositExits = await findOneDeposit( deposit_id );

        if( !depositExits ) {
            return res.status( EHttpStatus.NOT_FOUND ).json({ 
                status: EHttpStatus.NOT_FOUND, 
                message: `Deposit by depositId #${deposit_id}, not found` 
            });
        }

        await prisma.deposit.update({
            data: {
                status: DepositStatus.PAID,
                paid: true,
                paidAt: new Date(),
            },
            where: { invoiceId: deposit_id }
        });

        await prisma.$disconnect();

        return res.status( EHttpStatus.OK )
                .json({
                    status: EHttpStatus.OK,
                    message: 'Ok'
                });
        
    } catch (error) {
        
        await prisma.$disconnect();

        return res.status( EHttpStatus.BAD_REQUEST )
            .json({
                status: EHttpStatus.BAD_REQUEST,
                message: 'Error to deposit web hook'
            });
    }
}

const findOneDeposit =  async( depositId: number ) => {
    try {
        
        const deposit = await prisma.deposit.findUnique({
            where: { invoiceId: depositId }
        });
        
        return deposit;

    } catch (error) {
        return null;
    }
}

export {
    webHook
};