import {WorkingTimeTypeStatus} from "../api/types/workingTimeTypes";
import React from "react";
import {Box} from "@mui/system";

export const workingTimeStatusMapper = (status: WorkingTimeTypeStatus) => {
    switch (status) {
        case WorkingTimeTypeStatus.Start:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#f39c12"} color={"white"}>W trakcie</Box>
        case WorkingTimeTypeStatus.End:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#27ae60"} color={"white"}>Zakończono</Box>;
    }
};

