import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {Box} from "@mui/system";
import ComputerIcon from '@mui/icons-material/Computer';

const UserPrivacy = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Zabezpieczenia</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: "flex", width: "300px", justifyContent: "space-between"}}>
                        <Box>
                            <Typography variant="subtitle1">Hasło</Typography>
                            <Typography variant="subtitle2">***************</Typography>
                        </Box>
                        <Box>
                            <Button variant={"contained"} disableElevation>Zmień hasło</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{display: "flex", width: "300px", justifyContent: "space-between", flexGrow: 1}}>
                        <Box>
                            <Typography variant="subtitle1">Email</Typography>
                            <Typography variant="subtitle2">email@email.com</Typography>
                        </Box>
                        <Box>
                            <Button variant={"contained"} disableElevation>Zmień Email</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}>Ostanie logowania</Typography>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item>
                        <ComputerIcon fontSize={"large"}/>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid item xs={12}>
                            MacBook Pro Sosnowiec, Poland
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"subtitle2"} color={"green"}>Aktualnie</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item>
                        <ComputerIcon fontSize={"large"}/>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid item xs={12}>
                            MacBook Pro Sosnowiec, Poland
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"subtitle2"} color={"green"}>Aktualnie</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} disableElevation>Wyloguj ze wszystkich urządzeń</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserPrivacy;
