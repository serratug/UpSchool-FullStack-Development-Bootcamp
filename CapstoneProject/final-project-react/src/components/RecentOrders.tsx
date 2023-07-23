import * as React from 'react';
import {useContext, useEffect} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import '../App.css';
import {useNavigate} from "react-router-dom";
import {AppUserContext} from "../context/StateContext.tsx";
import {OrderContext} from "../context/OrderContext.tsx";
import {
    OrderGetByUserIdQuery,
    ProductAmountChoice,
    ProductAmountChoiceDisplay,
    ProductCrawlTypeDisplay
} from "../types/OrderTypes.ts";
import api from "../utils/axiosInstance.ts";
import {styled} from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
        backgroundColor: "transparent",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(0, 0, 0, .2)",
    },
}));


export default function RecentOrders() {

    const navigate = useNavigate();

    const { appUser } = useContext(AppUserContext);

    const { orderList, setOrderList } = useContext(OrderContext);

    const lastFiveOrders = orderList.length >= 5 ? orderList.slice(-5).reverse() : orderList;

    function navigateToOrdersPage() {
        navigate("/orders");
    }

    useEffect(() => {
        (async () => {
            if (orderList.length === 0){
                const orderGetByUserIdQuery:OrderGetByUserIdQuery = {
                    userId: appUser ? appUser.id ?? '' : '',
                };

                try {
                    const response = await api.post("/Orders/GetByUserId", orderGetByUserIdQuery);
                    setOrderList(response.data)
                }
                catch (error){
                    console.log(error);
                }
            }

            return;
        })();
    }, [appUser]);


    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                Recent Orders
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Requested</TableCell>
                        <TableCell align="center">Found</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lastFiveOrders.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">
                                {row.createdOn
                                    ? new Date(row.createdOn).toLocaleString("tr-TR", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric",
                                    })
                                    : "N/A"}
                            </TableCell>
                            <TableCell align="center">{ProductCrawlTypeDisplay[row.productCrawlType]}</TableCell>
                            {(row.productAmountChoice === ProductAmountChoice.All) ?
                                <TableCell align="center">{ProductAmountChoiceDisplay[row.productAmountChoice]}</TableCell>
                                :
                                <TableCell align="center">{row.requestedAmount}</TableCell>
                            }
                            <TableCell align="center">{row.totalFoundAmount}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="secondary" href="#" onClick={navigateToOrdersPage} sx={{ alignSelf: 'flex-start', mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}