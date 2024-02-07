import { CloudDoneRounded } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { cloneElement } from "react";
import { NavLink } from "react-router-dom";

interface SettingProps {
    children: JSX.Element[];
    onClick?: () => void;
}

const Root = ({ children, onClick }: SettingProps) => {
    return (
        <Grid item
            onClick={onClick}
            sx={{
                p: 1,
                width: "200px",
                background: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                ":hover": {
                    background: "#FAFBFB"
                }
            }}>
            {children}
        </Grid >
    );
};

interface IconProps {
    children: JSX.Element;
}

const Icon = ({ children }: IconProps) => {
    const newElement = cloneElement(children, {
        fontSize: "large"
    })


    return (
        <Grid item xs={12} p={5} >
            {newElement}
        </Grid >
    )
}

interface TitleProps {
    children: JSX.Element;
}

const Title = ({ children }: TitleProps) => {
    return (
        <Grid item xs={12}>
            {children}
        </Grid>
    )
};


export default {
    Root,
    Icon,
    Title
};