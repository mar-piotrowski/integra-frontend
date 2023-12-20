import React from "react";
import { ContractDto } from "../../api/types/documentTypes";
import CustomModal from "../../components/CustomModal";
import { Box, Button, Grid, Typography } from "@mui/material";
import { toDateString } from "../../utils/dateHelper";
import FormDate from "../../components/form/FormDate";

interface SignContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract?: ContractDto | null;
}

const SignContractModal = ({ isOpen, onClose, contract }: SignContractModalProps) => {
    return (
        <CustomModal open={isOpen} onClose={onClose}>
            <Box>
                <Typography variant={"h4"} my={1} textAlign={"center"}>Podpisywanie umowy</Typography>
                <Typography variant={"subtitle1"}>Szczegóły umowy</Typography>
                <span >
                    Typ umowy: {contract?.contractType}
                </span>
                <span>
                    Wymiar pracy: {contract?.workingHours1}/{contract?.workingHours2}
                </span>
                <Grid item >
                    Rozpoczęcie: {contract?.startDate != null ? toDateString(contract?.startDate) : "Brak"}
                </Grid>
                <Grid item >
                    Zakończenie: {contract?.endDate ?? "Brak terminu"}
                </Grid>
                <Grid item >
                    Wypłata brutto: {contract?.salaryWithTax} zł
                </Grid>
                <Grid item xs={12} >
                    Wypłata netto: {contract?.salaryWithoutTax} zł
                </Grid>
                <Typography variant={"h4"} my={1} textAlign={"center"}>DATA PODPISANIA UMOWY: {new Date().toLocaleDateString()}</Typography>
                <Button variant={"contained"} color="success" sx={{ width: "100%", my: 1, color: "white" }}>PODPISZ</Button>
            </Box>
        </CustomModal>
    )
};

export default SignContractModal;