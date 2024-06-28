import { Request, Response } from "express";
import { EHttpStatus } from "../environments";
import { IDepositBody } from "../interfaces";
import axios from "axios";
import { envs } from "../config";
import { onGetSignature, onGetXDate } from "../helpers";

const depositCreate = async ( req: Request, res: Response ) => {
    try {

        const body = req.body as any as IDepositBody;
        
        const response = await axios({
            method: 'POST',
            url: `${ envs.stg_url }/deposits`,
            data: {
                ...body,
                payment_method: "XA",
                success_url: envs.tupay_success_url,
	            notification_url: envs.tupay_notification_url
            },
            headers: {
                "Authorization": onGetSignature({}),
                "X-Login": envs.tupay_api_key,
                "X-Date": onGetXDate()
            }
        });
        
        console.log('response ::: ', response);

        res.status( EHttpStatus.CREATED ).json({
            status: EHttpStatus.CREATED,
            message: response,
        });

    } catch (error) {

        console.log('Error', error);
        
        res.status( EHttpStatus.BAD_REQUEST ).json({
            status: EHttpStatus.BAD_REQUEST,
            message: error
        });

    }
}

export {
    depositCreate
};