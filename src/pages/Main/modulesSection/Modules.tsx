import { Grid, Typography } from "@mui/material";
import React from "react";
import ModuleCard from "./components/ModuleCard";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const Modules = () => {
    return (
        <Grid container px={10} spacing={5} display="flex" justifyContent={"center"} alignItems={"center"}>
            <Grid item md={3} lg={2}>
                <ModuleCard
                    icon={PeopleAltOutlinedIcon}
                    title={"HRM"}
                    description="Zarządzaj pracownikami w jedym miejscu"
                />
            </Grid>
            <Grid item md={3} lg={2}>
                <ModuleCard
                    icon={PeopleAltOutlinedIcon}
                    title={"Produkcja"}
                    description="Zarządzaj pracownikami w jedym miejscu"
                />
            </Grid>
            <Grid item md={3} lg={2}>
                <ModuleCard
                    icon={PeopleAltOutlinedIcon}
                    title={"Faktury"}
                    description="Zarządzaj pracownikami w jedym miejscu"
                />
            </Grid>
            <Grid item md={3} lg={2}>
                <ModuleCard
                    icon={PeopleAltOutlinedIcon}
                    title={"Magazyn"}
                    description="Zarządzaj pracownikami w jedym miejscu"
                />
            </Grid>
            <Grid item md={3} lg={2}>
                <ModuleCard
                    icon={PeopleAltOutlinedIcon}
                    title={"Finanse"}
                    description="Zarządzaj pracownikami w jedym miejscu"
                />
            </Grid>
        </Grid>
    );
};

export default Modules;