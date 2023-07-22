
export type OrderEventGetAllDto = {
    id: string,
    orderId: string,
    status: OrderStatus,
    createdOn: Date,
}

export type OrderEventGetAllQuery = {
    orderId: string,
}

export enum OrderStatus {
    BotStarted = 1,
    CrawlingStarted = 2,
    CrawlingCompleted = 3,
    CrawlingFailed = 4,
    OrderCompleted = 5,
}

export const OrderStatusDisplay: Record<OrderStatus, string> = {
    [OrderStatus.BotStarted]: 'Bot Started.',
    [OrderStatus.CrawlingStarted]: 'Crawling Started.',
    [OrderStatus.CrawlingCompleted]: 'Crawling Completed.',
    [OrderStatus.CrawlingFailed]: 'Crawling Failed.',
    [OrderStatus.OrderCompleted]: 'Order Completed.',
};