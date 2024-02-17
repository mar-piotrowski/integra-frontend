import {Box} from "@mui/system";
import React from "react";

export const cardStatusMapper = (status: boolean) => {
    switch (status) {
        case true:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#27ae60"} color={"white"}>Aktywny</Box>;
        case false:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#e74c3c"} color={"white"}>Nieaktywny</Box>
    }
};

