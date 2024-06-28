import crypto from 'crypto';
import { onGetXDate } from './moment.helper';
import { envs } from '../config';

/**
 * Function to build has for tuPay
 * @param xLogin ApiKey tuPay
 * @param payload jsonData
 * @returns hash
 */
const onGetSignature = ( payload: any ): string => {

    const dataToHasing = onGetXDate() + envs.tupay_api_key + JSON.stringify( payload );
    
    const hash = crypto.createHmac('sha256', envs.tupay_api_key )
                        .update( dataToHasing )
                        .digest('hex');
    return "D24 " + hash;
    
}

export {
    onGetSignature
};