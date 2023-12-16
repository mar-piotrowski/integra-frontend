import {Backdrop, Box, CircularProgress, Typography} from "@mui/material";
import React from "react";

type BackdropLoadingProps = {
    text: string;
}

const BackdropLoading = ({text}: BackdropLoadingProps) => {
    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                }}>
                    <CircularProgress color="inherit"/>
                    <Typography variant={"h3"} color={"white"}>{text}</Typography>
                </Box>
            </Backdrop>
        </div>
    );
};

export default BackdropLoading;