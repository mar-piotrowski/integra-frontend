import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import Description from "../../components/Description";

const EmployeeCostCalculator = () => {
    return (
        <Grid container>
            <Grid item xs={12} mb={2}>
                <Typography variant="h3">Kalkulacja kosztów pracownika</Typography>
            </Grid>
            <Grid
                item
                container
                spacing={1}
                xs={12}
                sx={{ background: "#f8fafc", padding: 2, borderRadius: "8px" }}
            >
                <Grid item xs={12}>
                    <Description
                        variant="line"
                        title="Ubezpieczenie emerytalne"
                        value={123}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Description
                        variant="line"
                        title="Ubezpieczenie rentowe"
                        value={123}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Description
                        variant="line"
                        title="Ubezpieczenie wypadkowe"
                        value={123}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Description
                        variant="line"
                        title="Fundusz Pracy"
                        value={123}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Description
                        variant="line"
                        title="FGŚP"
                        value={123}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ background: "#eef2f6", padding: "8px", borderRadius: 1 }}>
                        <Description
                            variant="line"
                            title="Całkowity koszt"
                            value={123}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default EmployeeCostCalculator;