import Paper from "@mui/material/Paper";
import api from "../utils/axiosInstance.ts";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useContext, useEffect, useState} from "react";
import {
    OrderGetByUserIdDto,
    OrderGetByUserIdQuery,
} from "../types/OrderTypes.ts";
import {AppUserContext} from "../context/StateContext.tsx";
import {styled} from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
        backgroundColor: "transparent",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(0, 0, 0, .2)",
    },
}));

function OrdersPage() {

    const { appUser } = useContext(AppUserContext);

    const [orderList, setOrderList] = useState<OrderGetByUserIdDto[]>([]);


    useEffect(() => {

        const fetchOrders = async () => {

            const orderGetByUserIdQuery:OrderGetByUserIdQuery = {
                userId: appUser ? appUser.id ?? '' : '',
            };

            try {
                const response = await api.post("/Orders/GetByUserId", orderGetByUserIdQuery);
                setOrderList(response.data)
                console.log(response.data);
            }
            catch (error){
                console.log(error);
            }
        }

        fetchOrders();

    },[]);


    return(
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: "50vh",
                height: "max-content",
                width: "70vw",
            }}
        >
            <React.Fragment>
                <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                    Orders
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Requested</TableCell>
                            <TableCell align="right">Found</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.createdOn.toString()}</TableCell>
                                <TableCell align="right">{row.productCrawlType}</TableCell>
                                <TableCell align="right">{row.requestedAmount}</TableCell>
                                <TableCell align="right">{row.totalFoundAmount}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </Paper>
    );
}

export default OrdersPage