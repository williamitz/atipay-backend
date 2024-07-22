import CryptoJS from 'crypto-js';
import { envs } from '../config';

/**
 * Function to build has for tuPay
 * @param xLogin ApiKey tuPay
 * @param payload jsonData
 * @returns hash
 */
const onGetSignature = ( xDate: string, payload: any ): string => {

    const dataToHasing = xDate + envs.tupay_api_key + JSON.stringify( payload );

    const hash = CryptoJS.HmacSHA256( dataToHasing, envs.tupay_api_signature );
    return "D24 " + hash;
    
}

const onGetSignatureRetreats = ( payload: any ): string => {

    const hmac = CryptoJS.algo.HMAC.create( CryptoJS.algo.SHA256, envs.tupay_retreats_api_signature );

    hmac.update( JSON.stringify( payload ) );
    return  hmac.finalize().toString( CryptoJS.enc.Hex );
}

export {
    onGetSignature,
    onGetSignatureRetreats
};