import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Log} from "../types/LogTypes.ts";
import {SignalRContext} from "../context/SignalRContext.tsx";
import '../App.css'


function CrawlerLiveLogsPage() {

    const { logHubConnection } = useContext(SignalRContext);

    const [logs, setLogs] = useState<Log[]>([]);


    useEffect(() => {
        (async () => {
            logHubConnection?.on("NewLogAdded", (log: Log) => {
                setLogs((prevLogs) => [...prevLogs, log]);
            });

            return;
        })();
    }, []);

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // Align content to the top
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

                <List sx={{width: "60vw", textAlign: "left"}}>
                    {logs.map((log, index) => (
                        <ListItem key={index}>{log.message}</ListItem>
                    ))}
                </List>
            </Paper>

        </Box>
    );
}

export default CrawlerLiveLogsPage