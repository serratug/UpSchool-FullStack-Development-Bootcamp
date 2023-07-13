import * as React from 'react';
import Typography from '@mui/material/Typography';

interface StatProps {
    children?: React.ReactNode;
    title?: string;
    unit?: string;
}

export default function Statistics(props: StatProps) {
    return (
        <React.Fragment>
            {props.title && (
                <Typography component="h2" variant="h6" color="secondary" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                    {props.title}
                </Typography>
            )}
            <Typography component="p" variant="h4" gutterBottom>
                {props.children}
                <span style={{ fontSize: '20px', marginLeft: 6 }}>{props.unit}</span>
            </Typography>
        </React.Fragment>
    );
}