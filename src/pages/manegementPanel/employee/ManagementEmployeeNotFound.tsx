import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import React from "react"

const ManagementEmployeeNotFound = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="body2" my={10}>Nie znaleziono pracownika</Typography>
        </Box>
    )
}

export default ManagementEmployeeNotFound;