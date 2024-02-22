import {useNavigate} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import React from "react";

const ErrorPage = () => {
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
                <Typography variant={"h1"}>Wystąpił błąd</Typography>
            </Grid>
            <Grid item>
                <Button
                    variant={"outlined"}
                    onClick={() => navigate("/")}
                >
                    Strona główna
                </Button>
            </Grid>
        </Grid>
    );
}

export default ErrorPage;