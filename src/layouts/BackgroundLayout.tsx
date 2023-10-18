import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";
import React from "react";

const BackgroundLayout = () => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "10px",
                gap: "20px",
            }}
        >
            <Outlet/>
        </Box>
    )
}

export default BackgroundLayout;