
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RecentOrders from "../components/RecentOrders.tsx";
import CreateOrder from "../components/CreateOrder.tsx";
import Statistics from "../components/Statistics.tsx";
import {useContext, useEffect} from "react";
import {SignalRContext} from "../context/SignalRContext.tsx";
import {OrderContext} from "../context/OrderContext.tsx";


function DashboardPage() {

    const { logHubConnection } = useContext(SignalRContext);

    const { orderList } = useContext(OrderContext);


    const sumOfTotalFoundAmount = orderList.reduce((sum, order) => sum + order.totalFoundAmount, 0);


    useEffect(() => {
        (async () => {
            await logHubConnection?.invoke<string>("SendTokenAsync");

            return;
        })();
    }, [logHubConnection, orderList]);

    return(

        <Grid container spacing={3}>

            <Grid item xs={12} md={8} lg={4} style={{ height: "100%" }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 290,
                    }}
                >
                    <CreateOrder />
                </Paper>
            </Grid>
            
            <Grid container spacing={3} xs={8} sx={{pt: 3, pl: 3}}>
                <Grid item xs={12} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="Total Orders" unit="Orders">{orderList.length}</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="Crawled Products" unit="Products">{sumOfTotalFoundAmount}</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: 141,
                        }}
                    >
                        "Spiders spin webs of knowledge, bringing you digital treasures untold." 🕸️
                    </Paper>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{pr: 3}}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <RecentOrders />
                </Paper>
            </Grid>

        </Grid>

    );
}

export default DashboardPage