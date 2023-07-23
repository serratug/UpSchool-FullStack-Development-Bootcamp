import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Log} from "../types/LogTypes.ts";
import {SignalRContext} from "../context/SignalRContext.tsx";
import '../App.css'
import {OrderStatus, OrderStatusDisplay} from "../types/OrderEventTypes.ts";
import {toast} from "../components/ToastManager.tsx";


function CrawlerLiveLogsPage() {

    const { logHubConnection } = useContext(SignalRContext);

    const [logs, setLogs] = useState<Log[]>([]);

    const { notificationHubConnection } = useContext(SignalRContext);


    useEffect(() => {
        (async () => {
            logHubConnection?.on("NewLogAdded", (log: Log) => {
                console.log(log.message);
                setLogs((prevLogs) => [...prevLogs, log]);
            });

            let toasterTitle = "";

            notificationHubConnection?.on("NewNotificationAdded", (status: OrderStatus) => {

                if (status === OrderStatus.CrawlingCompleted)
                    toasterTitle = "success";
                else
                    toasterTitle = "error";

                toast.show({
                    title: toasterTitle,
                    content: OrderStatusDisplay[status],
                    duration: 10000,
                });
            });

            return;
        })();
    }, []);

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                color: "secondary",
                height: "80vh",
            }}
        >
            <Paper
                sx={{
                    minHeight: "50vh",
                    height: "max-content",
                    width: "70vw",
                    maxHeight: "80vh",
                    overflow: "auto",
                    p: 0,
                }}
            >
                <div className="top">
                    <div className="btns">
                        <span className="circle red"></span>
                        <span className="circle yellow"></span>
                        <span className="circle green"></span>
                    </div>
                    <div className="title">bash -- 70x32</div>
                </div>

                <List sx={{ width: "60vw", textAlign: "left" }}>
                    {logs.map((log, index) => {
                        const sentOnDate = log.sentOn ? new Date(log.sentOn) : null;
                        const formattedDate = sentOnDate
                            ? sentOnDate.toLocaleString("tr-TR", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                            })
                            : "N/A";

                        return (
                            <ListItem key={index}>
                                {log.message} | {formattedDate}
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>

        </Box>
    );
}

export default CrawlerLiveLogsPage