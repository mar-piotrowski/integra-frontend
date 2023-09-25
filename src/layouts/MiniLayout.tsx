import React from "react";
import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";

const MiniLayout = () => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                display: "flex",
                padding: "25px",
                borderRadius: "10px"
            }}
        >

            <Outlet/>
        </Box>
    );
};

export default MiniLayout;
