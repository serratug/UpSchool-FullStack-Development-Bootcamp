
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RecentOrders from "../components/RecentOrders.tsx";
import CreateOrder from "../components/CreateOrder.tsx";
import Statistics from "../components/Statistics.tsx";


function DashboardPage() {

    return(
        <>
            <Grid container spacing={3}>

                <Grid item xs={12} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="Total Orders" unit="Orders">3</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="Crawled Products" unit="Products">113</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="On Discount" unit="Products">70</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Statistics title="Non Discount" unit="Products">43</Statistics>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={4}>
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

                <Grid item xs={12} md={4} lg={8}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 290,
                        }}
                    >
                        <RecentOrders />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                        }}
                    >
                        3
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}

export default DashboardPage