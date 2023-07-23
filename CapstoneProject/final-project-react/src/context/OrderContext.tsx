import { createContext } from 'react';
import {OrderGetByUserIdDto} from "../types/OrderTypes.ts";

interface OrderContextType {
    orderList: OrderGetByUserIdDto[];
    setOrderList: React.Dispatch<React.SetStateAction<OrderGetByUserIdDto[]>>;
}

export const OrderContext = createContext<OrderContextType>({
    orderList: [],
    setOrderList: () => {[]},
});
