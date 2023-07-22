import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import api from "../utils/axiosInstance.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {OrderEventGetAllDto, OrderEventGetAllQuery, OrderStatusDisplay} from "../types/OrderEventTypes.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '1px 1px 15px rgba(50, 50, 50, .1)',
    p: 4,
};

type ModalProps = {
    open: boolean;
    onClose: () => void;
    orderId: string;
};

const OrderEventsModal: React.FC<ModalProps> = ({ open, onClose, orderId }) => {

    const [orderEvents, setOrderEvents] = useState<OrderEventGetAllDto[]>([]);


    useEffect(() => {
        if (open && orderId) {
            handleLoadOrderEvents();
        }
    }, [open,orderId]);

    const handleLoadOrderEvents = async () => {
        if (!orderId) return;

        console.log(event?.type);

        const orderEventGetAllQuery: OrderEventGetAllQuery = {
            orderId: orderId,
        };

        try {
            const response = await api.post("OrderEvents/GetAll", orderEventGetAllQuery);
            setOrderEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, .1)", opacity: '.4' } }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Events of Order {orderId}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Created On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderEvents?.map((orderEvent, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    {OrderStatusDisplay[orderEvent.status]}
                                </TableCell>
                                <TableCell align="center">
                                    {orderEvent.createdOn.toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Box>
        </Modal>
    );
};

export default OrderEventsModal;
