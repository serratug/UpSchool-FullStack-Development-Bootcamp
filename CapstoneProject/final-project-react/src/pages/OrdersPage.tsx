import Paper from "@mui/material/Paper";
import api from "../utils/axiosInstance.ts";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import {useContext, useEffect, useState} from "react";
import {
    OrderGetByUserIdQuery,
    OrderRemoveCommand,
    ProductAmountChoice, ProductAmountChoiceDisplay,
    ProductCrawlTypeDisplay
} from "../types/OrderTypes.ts";
import {AppUserContext} from "../context/StateContext.tsx";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {DeleteOutline, Visibility} from "@mui/icons-material";
import ProductsModal from "../components/ProductsModal.tsx";
import OrderEventsModal from "../components/OrderEventsModal.tsx";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {toast} from "react-toastify";
import {OrderContext} from "../context/OrderContext.tsx";


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

    const { orderList, setOrderList } = useContext(OrderContext);

    const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
    const [isOrderEventsModalOpen, setIsOrderEventsModalOpen] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleOpenProductsModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsProductsModalOpen(true);
    };

    const handleCloseProductsModal = () => {
        setIsProductsModalOpen(false);
        setSelectedOrderId(null);
    };

    const handleOpenOrderEventsModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsOrderEventsModalOpen(true);
    };

    const handleCloseOrderEventsModal = () => {
        setIsOrderEventsModalOpen(false);
        setSelectedOrderId(null);
    };

    const handleRemove = async (orderId: string) => {
        const orderRemoveCommand:OrderRemoveCommand = {
            id: orderId
        }

        try {
            const response = await api.post("/Orders/Remove", orderRemoveCommand);
            if(response.status === 200){
                const updatedOrderList = orderList.filter((order) => order.id !== orderId);
                setOrderList(updatedOrderList);
            } else{
                toast.error(response.statusText);
            }

        }
        catch (error){
            console.log(error);
        }
    }


    useEffect(() => {

        const fetchOrders = async () => {

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

        fetchOrders();

    }, [appUser]);

    // Export the table data to Excel, excluding "Products" and "Events" columns
    const handleExportToExcel = () => {
        const tableDataForExport = orderList.map(
            ({ id, createdOn, productCrawlType, requestedAmount, totalFoundAmount }) => ({
                id,
                createdOn: createdOn.toString(),
                productCrawlType,
                requestedAmount,
                totalFoundAmount,
            })
        );

        const worksheet = XLSX.utils.json_to_sheet(tableDataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const data = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(data, "orders_data.xlsx");
    };


    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // Align content to the top
                color: "secondary",
                height: "max-content",
                pt: 0,
            }}
        >
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
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                        <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                            Orders
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleExportToExcel}
                        >
                            Export to Excel
                        </Button>
                    </div>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Requested</TableCell>
                                <TableCell align="center">Found</TableCell>
                                <TableCell align="center">Events</TableCell>
                                <TableCell align="center">Products</TableCell>
                                <TableCell align="center"></TableCell>
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
                                    <TableCell align="center">
                                        <IconButton color="secondary" onClick={() => handleOpenOrderEventsModal(row.id)}>
                                            <Visibility />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="secondary" onClick={() => handleOpenProductsModal(row.id)}>
                                            <Visibility />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="error" onClick={() => handleRemove(row.id)}>
                                            <DeleteOutline />
                                        </IconButton>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </React.Fragment>
            </Paper>
            <OrderEventsModal open={isOrderEventsModalOpen} onClose={handleCloseOrderEventsModal} orderId={selectedOrderId ?? ""} />
            <ProductsModal open={isProductsModalOpen} onClose={handleCloseProductsModal} orderId={selectedOrderId ?? ""} />
        </Box>
    );
}

export default OrdersPage