import {Button, Grid, Typography} from "@mui/material";
import React from "react";

interface DocumentHeaderProps {
   title: string;
}

const DocumentHeader = ({title}: DocumentHeaderProps) => {
    return (
        <Grid item container>
            <Grid item xs={6}>
                <Typography variant={"h3"} mb={2}>{title}</Typography>
            </Grid>
            <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end", gap: "10px",}}>
                <Button disableElevation variant="contained" type="submit" color="primary"> Zapisz na stale </Button>
                <Button disableElevation variant="contained" type="submit" color="primary"> Zapisz tymczasowo</Button>
                <Button disableElevation variant="contained" color="error"> Anuluj </Button>
            </Grid>
        </Grid>
    )
};

export default DocumentHeader;