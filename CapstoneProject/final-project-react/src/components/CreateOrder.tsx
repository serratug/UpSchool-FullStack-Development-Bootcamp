import * as React from 'react';
import {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from "../utils/axiosInstance.ts";
import {
    OrderAddCommand,
    ProductAmountChoice,
    ProductAmountChoiceDisplay,
    ProductCrawlType,
    ProductCrawlTypeDisplay
} from "../types//OrderTypes.ts";


export default function CreateOrder(){

    const [allSelected, setAllSelected] = React.useState(true);
    const [orderAddCommand, setOrderAddCommand] = useState<OrderAddCommand>({
        productAmountChoice: ProductAmountChoice.All,
        requestedAmount: 0,
        productCrawlType: ProductCrawlType.All,
    });

    const handleSubmit = async (event:React.FormEvent) => {
        console.log("handle submit");

        event.preventDefault();

        try {
            const response = await api.post("/Orders/Add", orderAddCommand);
            console.log(response.data.data);
        }
        catch (error){
            console.log(error);
        }
    };

    const handleChange = (event: any) => {
        const { value } = event.target;
        setOrderAddCommand((prevOrderAddCommand) => ({
            ...prevOrderAddCommand,
            productAmountChoice: +value,
        }));
        setAllSelected(+value === ProductAmountChoice.All);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { value } = event.target;
        setOrderAddCommand((prevOrderAddCommand) => ({
            ...prevOrderAddCommand,
            productCrawlType: +value,
        }));
    };

    return(
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                    Create New Order
                </Typography>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={orderAddCommand.productAmountChoice}
                    onChange={handleChange}
                >
                    <FormControlLabel value={ProductAmountChoice.All} control={<Radio color="secondary" />} label={ProductAmountChoiceDisplay[ProductAmountChoice.All]} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel
                            value={ProductAmountChoice.SpecificAmount}
                            control={<Radio color="secondary" />}
                            label={ProductAmountChoiceDisplay[ProductAmountChoice.SpecificAmount]} />
                        <TextField
                            label="Amount"
                            color="secondary"
                            focused
                            disabled={allSelected} // Disable the TextField when allSelected is true
                            sx={{ width: '130px' }}
                            size="small"
                            value={orderAddCommand.requestedAmount}
                            onChange={(event: any) => {
                                const { value } = event.target;
                                setOrderAddCommand((prevOrderAddCommand) => ({
                                    ...prevOrderAddCommand,
                                    requestedAmount: value,
                                }));
                            }}
                            type="number"
                        />
                    </div>

                </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, textAlign: 'left' }} size="small">
                <InputLabel id="demo-select-small-label" color="secondary">
                    Product Type
                </InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    color="secondary"
                    id="demo-select-small"
                    value={orderAddCommand.productCrawlType.toString()}
                    label="Product Type"
                    onChange={handleSelectChange}
                >
                    {Object.values(ProductCrawlType).map((crawlType) => (
                        <MenuItem key={crawlType} value={crawlType}>
                            {ProductCrawlTypeDisplay[crawlType as ProductCrawlType]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Start
                </Button>
            </FormControl>
        </form>
    );
}