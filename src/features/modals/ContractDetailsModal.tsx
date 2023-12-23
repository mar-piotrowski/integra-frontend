import React from "react";
import { ContractDto } from "../../api/types/documentTypes";
import CustomModal from "../../components/CustomModal";
import { Box, Button, Grid, Typography } from "@mui/material";
import { toDateString } from "../../utils/dateHelper";

interface ContractDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract: ContractDto;
}

interface DetailProps {
    label: string;
    value: string | number;
}

const Detail = ({ label, value }: DetailProps) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">{label}:</Typography>
            <Typography variant="body1">{value}</Typography>
        </Box>
    )
}

const ContractDetailsModal = ({ isOpen, onClose, contract }: ContractDetailsModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "center" }} mb={1}>
                    <Typography variant="h3">Dane umowy</Typography>
                </Grid>
                <Grid item xs={12} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    <Detail label="Pracownik" value={`${contract.user.firstname} ${contract.user.lastname}`} />
                    <Detail label="Typ zatrudnienie" value={contract.contractType} />
                    <Detail label="Rodzaj zatrudnienia" value={`${contract.workingHours1}/${contract.workingHours2}`} />
                    <Detail label="Stanowisko" value={contract.jobPositionName} />
                    <Detail label="Wynagrodzenie brutto" value={contract.salaryWithTax} />
                    <Detail label="Wynagrodzenie netto" value={contract.salaryWithoutTax} />
                    <Detail label="Data rozpoczęcia" value={toDateString(contract.startDate)} />
                    <Detail label="Podpisania" value={contract.signedOnDate != null ? toDateString(contract.signedOnDate) : "Nie podpisano"} />
                    <Detail label="Data zakończenia" value={contract.endDate != null ? toDateString(contract.endDate) : "Nie podano"} />
                    <Detail label="Fundusz pracy" value={contract.jobFound ? "Tak" : "Nie"} />
                    <Detail label="Zwolnienie podatkowe" value={contract.pitExemption ? "Tak" : "Nie"} />
                    <Detail label="Ulga podatkowa" value={contract.taxRelief ? "Tak" : "Nie"} />
                    <Detail label="Składka dobrowolna" value={contract.voluntaryContribution ? "Tak" : "Nie"} />
                    <Detail label="Fundusz emerytalny" value={contract.pensionFund ? "Tak" : "Nie"} />
                    <Detail label="Fundusz rentowny" value={contract.profitableFund ? "Tak" : "Nie"} />
                    <Detail label="Koszty uzyskania przychodu" value={"250zł"} />
                    <Detail label="Kod tytułu ubezpieczenia" value={"fdsfo"} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" color="error" onClick={onClose}>Wyjdź</Button>
                    </Box>
                </Grid>
            </Grid>
        </CustomModal >
    )
};

export default ContractDetailsModal;