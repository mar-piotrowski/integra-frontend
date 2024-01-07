import React, { SyntheticEvent } from "react";
import { Grid, Tab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ManagementEmployeeDetails from "../manegementPanel/employee/ManagementEmployeeDetails";

const Profile = () => {
    const [value, setValue] = React.useState("1");
    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant={"h3"}>Profil pracownika</Typography>
            </Grid>
            <Grid item>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Dane pracownka" value="1" />
                            <Tab label="Czas pracy" value="2" />
                            <Tab label="Nieobecności" value="3" />
                            <Tab label="Dokumenty" value="4" />
                            <Tab label="Rozliczenia" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ManagementEmployeeDetails />
                    </TabPanel>
                    <TabPanel value="2">
                    </TabPanel>
                    <TabPanel value="3">
                    </TabPanel>
                    <TabPanel value="4">
                    </TabPanel>
                </TabContext>
            </Grid>
        </Grid>
    );
};

export default Profile;
