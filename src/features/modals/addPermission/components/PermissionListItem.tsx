import { Box, Checkbox, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

interface PermissionListItemProps {
    title: string;
    value: number;
    onToggle: (permissionCode: number) => void;
    select?: boolean;
}

const PermissionListItem = ({ title, value, onToggle, select }: PermissionListItemProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        if (select != null) {
            setIsChecked(true);
            onToggle(value);
        }
    }, [select])

    return (
        <ListItemButton
            onClick={() => {
                onToggle(value)
                setIsChecked(!isChecked);
            }}
        >
            <ListItemIcon >
                <Checkbox
                    edge="start"
                    checked={isChecked}
                />
            </ListItemIcon>
            <ListItemText
                id={`checkbox-list-list-label-${value}`}
                primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box><b>Nazwa:</b> {title}</Box>
                        <Box><b>Kod:</b> {value}</Box>
                    </Box>
                }
            />
        </ListItemButton>
    )
}

export default PermissionListItem;