export type ProductGetAllDto = {
    id: string,
    orderId: string,
    name: string,
    picture: string,
    isOnSale: boolean,
    price: number,
    salePrice: number,
}

export type ProductGetAllQuery = {
    orderId: string,
    pageNumber: number,
    pageSize: number,
}