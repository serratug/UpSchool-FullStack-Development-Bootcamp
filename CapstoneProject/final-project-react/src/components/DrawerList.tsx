import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Dashboard, Notifications, People, Settings, ShoppingCart, Terminal} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

export default function DrawerList() {

    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate("/");
    };

    const handleOrdersClick = () => {
        navigate("/orders");
    };

    const handleUsersClick = () => {
        navigate("/users");
    };

    const handleNotificationsClick = () => {
        navigate("/notifications");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    const handleLogsClick = () => {
        navigate("/crawlerlivelogs");
    };

    return(
        <List>
            <ListItem key='Dashboard' disablePadding>
                <ListItemButton onClick={handleDashboardClick}>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItemButton>
            </ListItem>

            <Divider/>

            <ListItem key='Orders' disablePadding>
                <ListItemButton onClick={handleOrdersClick}>
                    <ListItemIcon>
                        <ShoppingCart/>
                    </ListItemIcon>
                    <ListItemText primary='Orders' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Logs' disablePadding>
                <ListItemButton onClick={handleLogsClick}>
                    <ListItemIcon>
                        <Terminal/>
                    </ListItemIcon>
                    <ListItemText primary='Logs' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Users' disablePadding>
                <ListItemButton onClick={handleUsersClick}>
                    <ListItemIcon>
                        <People/>
                    </ListItemIcon>
                    <ListItemText primary='Users' />
                </ListItemButton>
            </ListItem>

            <Divider/>

            <ListItem key='Notifications' disablePadding>
                <ListItemButton onClick={handleNotificationsClick}>
                    <ListItemIcon>
                        <Notifications/>
                    </ListItemIcon>
                    <ListItemText primary='Notifications' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Settings' disablePadding>
                <ListItemButton onClick={handleSettingsClick}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary='Settings' />
                </ListItemButton>
            </ListItem>
        </List>
    );
}