import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import '../App.css';

function createData(
    id: string,
    date: string,
    type: string,
    requested: number,
    found: number,
) {
    return { id, date, type, requested, found };
}

const rows = [
    createData('8s7rnsbgvsg8jsdf', '13.06.2023', 'All', 14, 14),
    createData('8s7rnsbgvsg8jsdf', '13.06.2023', 'All', 14, 14),
    createData('8s7rnsbgvsg8jsdf', '13.06.2023', 'All', 14, 14),
    createData('8s7rnsbgvsg8jsdf', '13.06.2023', 'All', 14, 14),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function RecentOrders() {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                Recent Orders
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.requested}</TableCell>
                            <TableCell align="right">{row.found}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="secondary" href="#" onClick={preventDefault} sx={{ alignSelf: 'flex-start', mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}