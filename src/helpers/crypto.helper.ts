import crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import { envs } from '../config';

/**
 * Function to build has for tuPay
 * @param xLogin ApiKey tuPay
 * @param payload jsonData
 * @returns hash
 */
const onGetSignature = ( xDate: string, payload: any ): string => {

    const dataToHasing = xDate + envs.tupay_api_key + JSON.stringify( payload );
    
    // const hash = crypto.createHmac('sha256', 'hxmmKtruyGdmHqPuzLoENvZRqJgQBPZjB' )
    //                     .update( dataToHasing )
    //                     .digest('base64url');

    const hash = CryptoJS.HmacSHA256( dataToHasing, 'hxmmKtruyGdmHqPuzLoENvZRqJgQBPZjB' );
    return "D24 " + hash;
    
}

export {
    onGetSignature
};