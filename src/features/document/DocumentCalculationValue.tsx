import React from "react";
import {Box} from "@mui/material";

interface DocumentCalculationValueProps {
    title: string;
    value: number;
    sign: string;
    bgColor?: string;
}

const DocumentCalculationValue = ({title, value, sign, bgColor}: DocumentCalculationValueProps) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: bgColor,
            padding: "5px",
            borderRadius: 1
        }}>
            <div>{title}</div>
            <Box display={"flex"} gap={1} justifyContent={"space-between"}>
                <div>{value}</div>
                <div>{sign}</div>
            </Box>
        </Box>
    );
};

export default DocumentCalculationValue;