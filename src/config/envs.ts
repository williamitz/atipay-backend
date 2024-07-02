import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironments {
    PORT: number;
    DATABASE_URL: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_NAME: string;
    STG_URL: string;
    TUPAY_SUCCESS_URL: string;
    TUPAY_NOTIFICATION_URL: string;
    TUPAY_API_KEY: string;
    TUPAY_API_SIGNATURE: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    STG_URL: joi.string().required(),
    TUPAY_SUCCESS_URL: joi.string().required(),
    TUPAY_NOTIFICATION_URL: joi.string().required(),
    TUPAY_API_KEY: joi.string().required(),
    TUPAY_API_SIGNATURE: joi.string().required(),
})
.unknown( true );

const { error, value } = envSchema.validate( process.env );

if( error ) {
    throw new Error(`Config validation falied: ${ error.message }`);
}

const envVars: IEnvironments = value;

export const envs = {
    port: envVars.PORT,
    database_url: envVars.DATABASE_URL,
    db_password: envVars.DB_PASSWORD,
    db_port: envVars.DB_PORT,
    db_name: envVars.DB_NAME,
    stg_url: envVars.STG_URL,
    tupay_success_url: envVars.TUPAY_SUCCESS_URL,
    tupay_notification_url: envVars.TUPAY_NOTIFICATION_URL,
    tupay_api_key: envVars.TUPAY_API_KEY,
    tupay_api_signature: envVars.TUPAY_API_SIGNATURE,
};


