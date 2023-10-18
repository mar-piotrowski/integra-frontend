export const enum Gender {
    None,
    Male,
    Female,
}

export const vats = [23, 8, 5, 0];

export interface UserAbsent {
    userId: number;
    year: number;
    typ: string;
    days: number;
    days_used: number;
    days_moved: number;
    description: string;
}

export interface UserAbsentHistory {
    userId: number;
    holidayType: string;
    startDate: string;
    endDate: string;
    accepted: boolean;
    description: string;
}

export interface UserAbsentReason {
    absentType: string;
    startDate: string;
    endDate: string;
    accepted: boolean;
    description: string;
}

export interface UserContract {
    type: string;
    firstname: string;
    lastname: string;
    workingTimeType: string;
    startDate: string;
    endDate: string;
    salary: number;
}

export interface Article {
    groupId: number;
    name: string;
    code: string;
    type: string;
    gtin: string;
    measureUnit: string;
    buyPrice: number;
    buyCurrency: string;
    sellPrice: number;
    sellCurrency: number;
    image: string;
    vat: number;
    description: string;
}

export interface CurrencyStock {
    currency: string;
    exchangeDate: Date;
    amountExchangeDate: number;
    amountBeforeExchangeDate: number;
}

export interface UserAddContract {
    userId: number;
    salary: number;
    type: string;
    workingTimeType: string;
    startDate: Date;
    endDate: Date
    signOnDate: Date;
    jobFound: boolean;
    fgsp: boolean;
    exemptionPit: boolean;
    companyId: number;
    employmentDocumentType: number;
    employmentWorkingType: number;
    jobPosition: number;
    locationId: number;
    insuranceCode: number;
    texReliefId: number;
    deductibleCostId: number
    taxThresholdId: number;
}

export interface GoodsReceivedNote {
   documentNumber: string;
   issueDate: string;
   receptionDate: string;
   paymentDate: string;
   stockId: number;
   sellerId: number;
   currency: string;
   invoiceId: number;
}

export interface InternalGoodsTransferNote {
   documentNumber: string;
   issueDate: string;
   issueStockId: number;
   receiveStockId: number;
}

export interface DocumentArticle {
    code: string;
    measureUnit: string;
    amount: number;
    priceWithoutTax: number;
    discount: number;
    tax: number;
    totalPriceWithoutTax: number;
    totalPriceWithTax: number;
}