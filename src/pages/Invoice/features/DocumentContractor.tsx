import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Control } from "react-hook-form";

const DocumentContractor = () => {
    return (
        <Grid container item md={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Dane kontrahenta</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    border: "1px solid #0984e3",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    padding: "10px",
                    borderRadius: 1,

                }}>
                    <Typography variant={"h4"}>JANUSZEX</Typography>
                    <Typography variant={"body1"}>Aleja Jana Pawala II</Typography>
                    <Typography variant={"body1"}>41-200 Krakow</Typography>
                    <Typography variant={"body1"}>NIP 123123123</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Button variant="outlined">Dodaj kontrahenta</Button>
            </Grid>
        </Grid>
    );
};

export default DocumentContractor;