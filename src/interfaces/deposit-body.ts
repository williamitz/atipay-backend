
export interface IDepositBody {
    country:          string;
    currency:         string;
    amount:           string;
    invoice_id:       string;
    payer:            IPayer;
}

export interface IPayer {
    email:         string;
    document:      string;
    document_type: string;
    last_name:     string;
    first_name:    string;
}
