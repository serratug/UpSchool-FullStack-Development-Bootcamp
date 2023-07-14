export type OrderAddCommand = {
    productAmountChoice: ProductAmountChoice,
    requestedAmount: number,
    productCrawlType: ProductCrawlType,
}

export enum ProductCrawlType {
    All = 1,
    OnDiscount = 2,
    NonDiscount = 3,
}

export enum ProductAmountChoice {
    All = 1,
    SpecificAmount = 2,
}