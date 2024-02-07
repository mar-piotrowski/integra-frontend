import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import React from "react"

const ProfileUserNotFound = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="body2" my={10}>Nie znaleziono użytkownika</Typography>
        </Box>
    )
}

export default ProfileUserNotFound;