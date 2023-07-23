import {FormGroup, Switch} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import api from "../utils/axiosInstance.ts";
import {useEffect, useState} from "react";
import {NotificationSettingsDto} from "../types/NotificationTypes.ts";
import {toast} from "../components/ToastManager.tsx";


function SettingsPage() {

    const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsDto>({
        pushNotification: false,
        emailNotification: false,
        email: '',
    });

    useEffect(() => {

        const fetchSettings = async () => {

            try {
                const response = await api.get("/NotificationSettings/GetByUserId");
                setNotificationSettings(response.data)
                console.log(response.data);
            }
            catch (error){
                console.log(error);
            }
        }

        fetchSettings();

    },[]);

    const handleSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        try {
            console.log(notificationSettings);
            const response = await api.put("/NotificationSettings/Update", notificationSettings);
            if (response.status === 200){
                toast.show({
                    title: "success",
                    content: "Your settings successfully updated.",
                    duration: 10000,
                });
            }
            else {
                toast.show({
                    title: "error",
                    content: "Error updating settings.",
                    duration: 10000,
                });
            }

        }
        catch (error){
            console.log(error);
            toast.show({
                title: "error",
                content: "Unexpected error.",
                duration: 10000,
            });
        }
    };

    const handlePushSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationSettings((prevState) => ({
            ...prevState,
            pushNotification: event.target.checked,
        }));
    };

    const handleEmailSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationSettings((prevState) => ({
            ...prevState,
            emailNotification: event.target.checked,
        }));
    };

    return(
        <Box sx={{
            width: "60vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 0,
        }}
        >
            <Typography variant="h4" noWrap component="div">
                Notification Settings
            </Typography>
            <p>
                Select the kinds of notifications you get about your orders.
            </p>

            <FormGroup>
                <FormControlLabel control={
                    <Switch
                        checked={notificationSettings?.pushNotification}
                        onChange={handlePushSwitchChange}
                        color="secondary"
                    />
                } label="Push Notifications" />

                <FormControlLabel control={
                    <Switch
                        checked={notificationSettings?.emailNotification}
                        onChange={handleEmailSwitchChange}
                        color="secondary"
                    />
                } label="E-mail Notifications" />
            </FormGroup>

            <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                type="submit"
                sx={{mt: 4}}
            >
                Save
            </Button>
        </Box>
    );
}

export default SettingsPage