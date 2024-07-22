export enum EAccountType {
    C = "C",
    S = "S"
}

export enum EDoctumentType {
    PASS = "PASS",
    RUC = "RUC",
    CE = "CE",
    DNI = "DNI"
}

export const documentsValid = [ EDoctumentType.CE, EDoctumentType.DNI, EDoctumentType.PASS, EDoctumentType.RUC ];