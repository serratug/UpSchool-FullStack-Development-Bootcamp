import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function CreateOrder(){

    const [productAmountChoice, setProductAmountChoice] = React.useState('all');
    const [allSelected, setAllSelected] = React.useState(true);
    const [productCrawlType, setProductCrawlType] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductAmountChoice((event.target as HTMLInputElement).value);
        setAllSelected(productAmountChoice != 'all');
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setProductCrawlType(event.target.value);
    };

    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                    Create New Order
                </Typography>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={productAmountChoice}
                    onChange={handleChange}
                >
                    <FormControlLabel value="all" control={<Radio color="secondary" />} label="All" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel value="specific" control={<Radio color="secondary" />} label="Specfic Amount" />
                        <TextField
                            label="Amount"
                            color="secondary"
                            focused
                            disabled={allSelected}
                            sx={{ width: '130px' }}
                            size="small"
                        />
                    </div>

                </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label" color="secondary">Product Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    color="secondary"
                    id="demo-select-small"
                    value={productCrawlType}
                    label="Product Type"
                    onChange={handleSelectChange}
                >
                    <MenuItem value={10}>All</MenuItem>
                    <MenuItem value={20}>On Discount</MenuItem>
                    <MenuItem value={30}>Non Discount</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Button variant="contained" color="secondary" >Start</Button>
            </FormControl>
        </>
    );
}