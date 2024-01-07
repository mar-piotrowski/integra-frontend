import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import image from "../../../assets/image1.png";

const WelcomeBannerDescription = () => {
    const theme = useTheme();

    return (
        <Grid
            container
            xs={12}
            p={4}
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: theme.palette.grey[200] }}
        >
            <Grid item md lg={4} display="flex" justifyContent={"center"} alignItems={"center"}>
                <Box
                    component={"img"}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxSizing: "border-box",
                        maxWidth: { xs: 100, sm: 450, md: 550 },
                    }}
                    src={image}
                />
            </Grid>
            <Grid item display="flex" justifyContent={"center"} alignItems={"center"}>
                <Box sx={{ width: "400px" }}>
                    <Typography variant="h2" color="primary">Oszczędzaj czas</Typography>
                    <Typography variant="h3" mb={2}>zdobywaj rynek dzięki przewadze</Typography>
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqnulla p
                        Excepteur sint occaecat cupidatat non
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default WelcomeBannerDescription;