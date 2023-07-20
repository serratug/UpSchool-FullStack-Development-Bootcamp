export type OrderAddCommand = {
    productAmountChoice: ProductAmountChoice,
    requestedAmount: number,
    productCrawlType: ProductCrawlType,
}

export type OrderGetByUserIdDto = {
    id: string,
    userId: string,
    productAmountChoice: ProductAmountChoice,
    requestedAmount: number,
    totalFoundAmount: number,
    productCrawlType: ProductCrawlType,
    createdOn: Date,
}

export type OrderGetByUserIdQuery = {
    userId: string,
}

export enum ProductCrawlType {
    All = 1,
    OnDiscount = 2,
    NonDiscount = 3,
}

export const ProductCrawlTypeDisplay: Record<ProductCrawlType, string> = {
    [ProductCrawlType.All]: 'All',
    [ProductCrawlType.OnDiscount]: 'On Discount',
    [ProductCrawlType.NonDiscount]: 'Non Discount',
};

export enum ProductAmountChoice {
    All = 1,
    SpecificAmount = 2,
}

export const ProductAmountChoiceDisplay: Record<ProductAmountChoice, string> = {
    [ProductAmountChoice.All]: 'All',
    [ProductAmountChoice.SpecificAmount]: 'Specific Amount',
};