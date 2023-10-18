import {Grid, Typography} from "@mui/material";
import React from "react";

interface RepresentationProps {
    title: string;
    value: string;
    xs: number;
    md: number;
}

const Representation = ({title, value, xs, md}: RepresentationProps) => {
    return (
        <Grid item container xs={xs} md={md}>
            <Grid item xs={12}>
                <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1">{value}</Typography>
            </Grid>
        </Grid>
    )
}

export default Representation;