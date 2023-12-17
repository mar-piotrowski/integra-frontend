import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import useGetEmployee from "../../hooks/employee/useGetEmployee";
import useAuth from "../../hooks/auth/useAuth";
import ProfilePresentation from "../../components/ProfilePresentation";
import TextWithLabel from "../../components/TextWithLabel";
import { LocationDto } from "../../api/types/locationTypes";

const EmployeeDetails = () => {
    const { auth } = useAuth();
    const { data: employee } = useGetEmployee(auth!.userId);

    const userLocations = employee?.locations?.map((location: LocationDto) =>
        <Box sx={{ display: "flex", margin: "10px 0 0 8px", gap: "20px" }}>
            <TextWithLabel label="Państwo" text={location.country} />
            <TextWithLabel label="Miasto" text={location.city} />
            <TextWithLabel label="Ulica" text={location.street} />
            <TextWithLabel label="Numer mieszkania" text={location.houseNo} />
            <TextWithLabel label="Numer mieszkania" text={location.houseNo} />
        </Box>
    );

    return (
        <Grid container spacing={2}>
            <ProfilePresentation
                name={`${employee?.firstname} ${employee?.lastname}`}
                position={`Stanowisko: ${employee?.jobPosition ?? "Nie przypisano"}`}
            />
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Informacje Personalne</Typography>
                </Grid>
                <Box sx={{ display: "flex", margin: "10px 0 0 8px", gap: "20px" }}>
                    <TextWithLabel label={"Imię"} text={employee?.firstname} />
                    <TextWithLabel label={"Drugie imię"} text={
                        employee?.secondName == null || employee?.secondName == ""
                            ? "Brak"
                            : employee?.secondName}
                    />
                    <TextWithLabel label={"Nazwisko"} text={employee?.lastname} />
                </Box>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dane Kontaktowe</Typography>
                </Grid>
                <Box sx={{ display: "flex", margin: "10px 0 0 8px", gap: "20px" }}>
                    <TextWithLabel label="Email" text={employee?.email} />
                    <TextWithLabel label={"Telefon"} text={employee?.phone ?? "123"} />
                </Box>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dane Adresowe</Typography>
                </Grid>
                <Box sx={{ display: "flex", margin: "10px 0 0 8px", gap: "20px" }}>
                    {userLocations?.length == 0 ? "Brak" : userLocations}
                </Box>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Numery Identyfikacyjne</Typography>
                </Grid>
                <Box sx={{ display: "flex", margin: "10px 0 0 8px", gap: "20px" }}>
                    <TextWithLabel label="Numer dowodu" text={employee?.identityNumber ?? "Brak"} />
                </Box>
            </Grid>
        </Grid>
    )
};

export default EmployeeDetails;