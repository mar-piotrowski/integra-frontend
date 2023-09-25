import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
    Divider,
} from "@mui/material";
import {MouseEvent, useState} from "react";
import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {CustomListItemButton} from "../components/CustomListItemButton";
import {Link} from "react-router-dom";

const AccountDropdown = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box>
                <Tooltip title="Konto">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                sx={{mt: 3}}
                MenuListProps={{
                    sx: {p: 2, width: "100%", maxWidth: 250, minWidth: 250},
                }}
            >
                <Box sx={{mb: 2}}>
                    <Typography variant="subtitle1">Witaj, Marcin Piotrowski</Typography>
                    <Typography variant="caption">Senior Engineer</Typography>
                </Box>
                <Divider sx={{my: 1}}/>
                <CustomListItemButton component={Link} to="/management-panel/account" onClick={handleClose}>
                    <ListItemIcon>
                        <PermIdentityOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>Profil</ListItemText>
                </CustomListItemButton>
                <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>Ustawienia</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>Wyloguj</ListItemText>
                </ListItemButton>
            </Menu>
        </>
    );
};

export default AccountDropdown;
