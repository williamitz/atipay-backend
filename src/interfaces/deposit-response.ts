
export interface IDepositResponse {
    checkout_type:       string;
    redirect_url:        string;
    iframe:              boolean;
    deposit_id:          number;
    merchant_invoice_id: string;
    payment_info:        IPaymentInfo;
}

export interface IPaymentInfo {
    type:                  string;
    payment_method:        string;
    payment_method_name:   string;
    amount:                number;
    currency:              string;
    expiration_date:       Date;
    created_at:            Date;
    metadata:              IMetadata;
    multigateway_metadata: IMultigatewayMetadatum[];
}

export interface IMetadata {
    reference:           number;
    beneficiary_name:    string;
    payment_method_code: string;
}

export interface IMultigatewayMetadatum {
    reference?:         string;
    beneficiaryName?:   string;
    paymentMethodCode:  string;
    paymentMethodType:  string;
    agreement?:         string;
    paymentMethodName?: string;
    payerName?:         string;
    subType?:           string;
    qrCode?:            string;
    redirectUrl?:       string;
}
