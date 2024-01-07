import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ChooseLoginCard from "./ChooseLoginCard";
import PersonIcon from '@mui/icons-material/Person';
import FactoryIcon from '@mui/icons-material/Factory';

const ChooseLogin = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography textAlign={"center"} variant="h2">Gdzie chcesz się zalogować?</Typography>
                </Grid>
                <Grid
                    item
                    container
                    spacing={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Grid item>
                        <ChooseLoginCard icon={PersonIcon} title={"Pracownik"} to={"/employee-panel/login"} />
                    </Grid>
                    <Grid item>
                        <ChooseLoginCard icon={FactoryIcon} title={"Zarządca"} to={"/management-panel/login"} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChooseLogin;