import { Box } from "@mui/system"
import React from "react";
import { ContractStatusType } from "../api/types/documentTypes";

interface ContractStatusProps {
    status: ContractStatusType;
}

const ContractStatus = ({ status }: ContractStatusProps) => {
    const statusColorResolver = (): string => {
        switch (status) {
            case 1: return "#27ae60";
            case 2: return "#f1c40f"
            case 3: return "#c0392b";
            default: return "#7f8c8d";
        };
    }

    const statusTitleResolver = (): string => {
        switch (status) {
            case 1: return "Aktywny";
            case 2: return "Oczkuje";
            case 3: return "Zakończony";
            default: return "Nieznany";
        }
    }

    return (
        <Box sx={{
            background: statusColorResolver,
            borderRadius: "5px",
            color: "white",
            fontSize: "12px",
            padding: "4px"
        }}>{statusTitleResolver()}</Box>
    )
}

export default ContractStatus;