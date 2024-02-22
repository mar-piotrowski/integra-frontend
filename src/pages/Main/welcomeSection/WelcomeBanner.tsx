import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../components/CustomButton";
import image from "../../../assets/Analytic.png";
import {useNavigate} from "react-router-dom";

const WelcomeBanner = () => {
    const navigate = useNavigate();
    return (
        <Grid container justifyContent={"center"} alignItems={"center"} gap={10} my={10}>
            <Grid item spacing={2}>
                <Box >
                    <Typography variant="h1">INTEGRA</Typography>
                    <Typography variant="h2" color="primary">Innowacja na</Typography>
                    <Typography variant="h2" color="primary">każdym korku</Typography>
                    <Typography variant="subtitle1" sx={{ maxWidth: "400px" }} mt={2}>
                        Dzięki naszemu systemowi możesz
                        osiągnąć wyższy poziom
                        efektywnosći w zarządzaniu swoją firmą.
                        Umów się na przezentację systemu z naszym konsultantem
                    </Typography>
                    <Box mt={2}>
                        <CustomButton variant="contained" text="Umów się" onClick={() => navigate("/contact")}/>
                    </Box>
                </Box>
            </Grid>
            <Grid item display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box
                    component={"img"}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 4,
                        boxSizing: "border-box",
                        maxWidth: { xs: 0, sm: 0, md: 350 },
                    }}
                    src={image}
                />
            </Grid>
        </Grid>
    );
};

export default WelcomeBanner;