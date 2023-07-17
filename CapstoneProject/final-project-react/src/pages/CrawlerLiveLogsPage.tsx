import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {LocalJwt} from "../types/AuthTypes.ts";
import {Log} from "../types/LogTypes.ts";
import {SignalRContext} from "../context/SignalRContext.tsx";


function CrawlerLiveLogsPage() {

    const { logHubConnection, orderHubConnection } = useContext(SignalRContext);

    const [logs, setLogs] = useState<Log[]>([]);


    useEffect(() => {
        (async () => {
            const jwtJson = localStorage.getItem("crawler_user");

            if (jwtJson) {
                const localJwt: LocalJwt = JSON.parse(jwtJson);

                console.log(localJwt.accessToken);

                await orderHubConnection?.invoke<string>("SendTokenAsync");

                logHubConnection?.on("NewLogAdded", (log: Log) => {
                    console.log("log sinyali geldi.");
                    console.log(log.message);
                    setLogs((prevLogs) => [...prevLogs, log]);
                });

                return;
            }
        })();
    }, []);

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // Align content to the top
                color: "secondary",
                height: "90vh",
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start", // Align content to the top
                    minHeight: "50vh",
                    height: "max-content",
                    width: "70vw",
                    p: 2,
                    pl: 4,
                    pr: 4,
                }}
            >
                <ul style={{ width: "100vw", textAlign: "left" }}>
                    {logs.map((log, index) => (
                        <li key={index}>{log.message}</li>
                    ))}
                </ul>
            </Paper>
        </Box>
    );
}

export default CrawlerLiveLogsPage