import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
                height: "100vh"
            }}
        >
            <Grid item>
                <Typography variant={"h1"}>Ups... nie posiadasz uprawnień</Typography>
            </Grid>
            <Grid item>
                <Button
                    variant={"outlined"}
                    onClick={() => navigate(-3)}
                >
                    Powrót
                </Button>
            </Grid>
        </Grid>
    );
};

export default Unauthorized;
