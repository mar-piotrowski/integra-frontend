import {LocationDto} from "../../api/types/locationTypes";
import React from "react";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ProfilePresentation from "../../components/ProfilePresentation";
import TextWithLabel from "../../components/TextWithLabel";
import {UserDto} from "../../api/types/userTypes";

const defaultWhenEmpty = <T, >(defaultText: string, value?: T,) => value == null || value == "" ? defaultText : value;

interface EmployeeDetailsProps {
    employee: UserDto;
}

const UserDetails = ({employee}: EmployeeDetailsProps) => {
    const userLocations = employee?.locations?.map((location: LocationDto) => (
        <>
            <Grid item xs={12} md={6}>
                <TextWithLabel label="Państwo" text={location.country}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextWithLabel label="Miasto" text={location.city}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextWithLabel label="Ulica" text={location.street}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextWithLabel label="Numer mieszkania" text={location.houseNo}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextWithLabel label="Numer mieszkania" text={location.houseNo}/>
            </Grid>
        </>
    ));

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ProfilePresentation
                    name={`${employee?.firstname} ${employee?.lastname}`}
                    position={`Stanowisko: ${employee?.jobPosition ?? "Nie przypisano"}`}
                />
            </Grid>
            <Grid item container xs={12} md={6} lg={3} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" mb={1}>Informacje Personalne</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextWithLabel label={"Imię"} text={employee?.firstname}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextWithLabel label={"Drugie imię"} text={defaultWhenEmpty("Brak", employee?.secondName)}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextWithLabel label={"Nazwisko"} text={employee?.lastname}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextWithLabel label="Obywatelstwo" text={defaultWhenEmpty("Brak", employee?.citizenship)}/>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={6} lg={3} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" mb={1}>Dane Kontaktowe</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextWithLabel label="Email" text={employee?.email}/>
                </Grid>
                <Grid item xs={12}>
                    <TextWithLabel label={"Telefon"} text={defaultWhenEmpty("Brak", employee?.phone)}
                    />
                </Grid>
            </Grid>
            <Grid item container sm={12} md={6} lg={3} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" mb={1}>Dane Adresowe</Typography>
                </Grid>
                {
                    userLocations?.length == 0
                        ? <Grid item>Brak</Grid>
                        : userLocations
                }
            </Grid>
            <Grid item container sm={12} md={6} lg={3} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" mb={1}>Numery Identyfikacyjne</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: "flex", margin: "10px 0 0 8px", gap: "20px"}}>
                        <TextWithLabel label="Numer dowodu" text={defaultWhenEmpty("Brak", employee?.documentNumber)}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: "flex", margin: "10px 0 0 8px", gap: "20px"}}>
                        <TextWithLabel label="Pesel" text={defaultWhenEmpty("Brak", employee?.personalIdNumber)}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: "flex", margin: "10px 0 0 8px", gap: "20px"}}>
                        <TextWithLabel label="Nip" text={defaultWhenEmpty("Brak", employee?.nip)}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UserDetails;