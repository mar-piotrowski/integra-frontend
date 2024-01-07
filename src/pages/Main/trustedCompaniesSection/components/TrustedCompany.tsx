import { Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";

interface TrustedCompanyProps {
    companyName: string;
    colaborateFrom: Date;
}

const TrustedCompany = ({ companyName, colaborateFrom }: TrustedCompanyProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.grey[200],
                padding: 2,
                borderRadius: 4
            }}
        >
            <Typography variant="h3" py={4}>{companyName}</Typography>
            <Typography variant="subtitle2">Współpracujemy od: {colaborateFrom.toDateString()}</Typography>
        </Box>
    );
};

export default TrustedCompany;