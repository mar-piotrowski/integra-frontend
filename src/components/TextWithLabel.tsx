import { Grid, Typography } from "@mui/material";
import React from "react";

interface TextWithLabelProps {
    label: string;
    text: string;
}

const TextWithLabel = ({ text, label }: TextWithLabelProps) => {
    return (
        <Grid item container>
            <Grid item xs={12}>
                <Typography variant="subtitle2">{label}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1">{text}</Typography>
            </Grid>
        </Grid >
    )
};

export default TextWithLabel;