import React from "react";
import {Avatar, Box, Grid, Typography} from "@mui/material";

const EmployeeDetails = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box sx={{display: "flex"}}>
                    <Avatar sx={{width: 80, height: 80}}/>
                    <Box sx={{marginLeft: "20px"}}>
                        <Typography variant="h3">Marcin Piotrowski</Typography>
                        <Typography variant="subtitle1">Senior engineer</Typography>
                        <Typography variant="subtitle1">Sosnowiec, Poland</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Informacje Personalne</Typography>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Imię</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Nazwisko</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Piotrowski</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin@gmal.com</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Telefon</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">+48 123123123</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dane osobowe</Typography>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Imię</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Nazwisko</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Piotrowski</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin@gmal.com</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Telefon</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">+48 123123123</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dane szczegołowe</Typography>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Imię</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Nazwisko</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Piotrowski</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin@gmal.com</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Telefon</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">+48 123123123</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Numery Identyfikacyjne</Typography>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Imię</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Nazwisko</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Piotrowski</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Marcin@gmal.com</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Telefon</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">+48 123123123</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
};

export default EmployeeDetails;