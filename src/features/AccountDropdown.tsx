import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import {MouseEvent, useState} from "react";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {CustomListItemButton} from "../components/CustomListItemButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {SvgIconComponent} from "@mui/icons-material";
import useAuth from "../hooks/auth/useAuth";
import useEmployee from "../hooks/employee/useUser";

export interface AccountDropdownItem {
    to: string;
    title: string;
    icon: SvgIconComponent
}

interface AccountDropdownProps {
    items: AccountDropdownItem[]
}

const AccountDropdown = ({items}: AccountDropdownProps) => {
    const {auth} = useAuth();
    const {data: user} = useEmployee(auth!.userId);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleClose();
        navigate("/logout")
    }

    const renderItems = items.map((item, index) => {
        const Icon = item.icon;
        if (location.pathname.includes("employee-panel") && item.title.toLowerCase() == "ustawienia")
            return;
        return (
            <CustomListItemButton key={index} component={Link} to={item.to} onClick={handleClose}>
                <ListItemIcon>
                    <Icon/>
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
            </CustomListItemButton>
        );
    });

    const handleIconUserLetter = () => {
        if(user?.firstname == undefined) return "M".toUpperCase();
        return user.firstname[0].toUpperCase();
    }

    return (
        <>
            <Box>
                <Tooltip title="Konto">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? "Account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32}}>{handleIconUserLetter()}</Avatar>
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
                {renderItems}
                <ListItemButton onClick={handleLogout}>
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
