import {
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { MenuItem } from "../../constants/navigation/menuItems";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { CustomListItemButton } from "../CustomListItemButton";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { set } from "../../store/sidebarSlice";
import { add } from "../../store/collapseMenuSlice";

interface NavItemProps {
    item: MenuItem;
    level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme();
    const location = useLocation();
    const collapseMenusSelector = useSelector(
        (state: RootState) => state.collepseMenus.collapaseMenus
    );
    const dispatch = useDispatch();
    const responsive = useMediaQuery(theme.breakpoints.down("lg"));

    useEffect(() => {
        if (location.pathname == item?.url)
            listItemHandler(item.id)
    }, [])

    const Icon = item.icon;
    const itemIcon =
        item.icon != null ? (
            <Icon />
        ) : (
            <FiberManualRecordRoundedIcon
                sx={{
                    width:
                        collapseMenusSelector.findIndex((id: string) => id === item.id) > -1
                            ? 8
                            : 6,
                    height:
                        collapseMenusSelector.findIndex((id: string) => id === item.id) > -1
                            ? 8
                            : 6,
                }}
                fontSize={"inherit"}
            />
        );

    const listItemHandler = (id: string) => {
        dispatch(add(id));
        if (responsive) dispatch(set(false));
    };

    return (
        <CustomListItemButton
            component={Link}
            to={item.url}
            disabled={item.disabled}
            sx={{
                mb: 0.5,
                alignItems: "flex-start",
                backgroundColor: level > 1 ? "transparent !important" : "inherit",
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
            }}
            selected={
                collapseMenusSelector.findIndex((id: string) => id === item.id) > -1
                && location.pathname.includes(item?.url ?? "")
            }
            onClick={() => {
                listItemHandler(item.id);
            }}
        >
            <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
                {itemIcon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={
                            collapseMenusSelector.findIndex((id: string) => id === item.id) >
                                -1
                                ? "h5"
                                : "body1"
                        }
                        sx={{ my: "auto" }}
                        color="inherit"
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            ></ListItemText>
        </CustomListItemButton>
    );
};

export default NavItem;
