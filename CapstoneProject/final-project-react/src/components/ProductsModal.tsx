import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import {ProductGetAllDto, ProductGetAllQuery} from "../types/ProductTypes.ts";
import {useEffect, useState} from "react";
import api from "../utils/axiosInstance.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {PaginatedList} from "../types/GenericTypes.ts";

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

const ProductsModal: React.FC<ModalProps> = ({ open, onClose, orderId }) => {

    const [paginatedProducts, setPaginatedProducts] = useState<PaginatedList<ProductGetAllDto> | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 6;

    useEffect(() => {
        if (open && orderId) {
            handleLoadProducts(null, currentPage);
        } else {
            setCurrentPage(1); // Reset the page to 1 when the modal is closed
            setPaginatedProducts(null); // Reset the paginatedProducts state when the modal is closed
        }
    }, [open, currentPage, orderId]);

    const handleLoadProducts = async (event: React.ChangeEvent<unknown> | null, page: number) => {
        if (!orderId) return;

        console.log(event?.type);

        setCurrentPage(page);

        const productGetAllQuery: ProductGetAllQuery = {
            orderId: orderId,
            pageNumber: page,
            pageSize: pageSize,
        };

        try {
            const response = await api.post("Products/GetAll", productGetAllQuery);
            setPaginatedProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        onClose();
        setCurrentPage(1); // Reset the page to 1 when the modal is closed
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
                    Products of Order {orderId}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sale Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts?.items.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img
                                        alt=""
                                        src={product.picture}
                                        style={{ height: '4em' }}
                                    />
                                </TableCell>
                                <TableCell style={styleForPrice(product.isOnSale)}>
                                    {product.name}
                                </TableCell>
                                <TableCell style={styleForPrice(product.isOnSale)}>
                                    {product.price.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </TableCell>
                                <TableCell style={styleForSalePrice(product.isOnSale)}>
                                    {product.isOnSale
                                        ? product.salePrice.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })
                                        : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {paginatedProducts && (
                    <Pagination
                        count={paginatedProducts.totalPages}
                        page={currentPage}
                        onChange={(event, page) => handleLoadProducts(event, page)}
                        color={"secondary"}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default ProductsModal;

const styleForPrice = (isOnSale: boolean) => ({
    textDecoration: isOnSale ? 'line-through' : 'none',
    color: isOnSale ? '#bbbbbb' : 'inherit',
});

const styleForSalePrice = (isOnSale: boolean) => ({
    color: isOnSale ? '#14A44D' : 'inherit',
});
