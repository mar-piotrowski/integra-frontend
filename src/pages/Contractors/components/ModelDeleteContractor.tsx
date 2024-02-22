import React, {useEffect} from "react";
import CustomModal from "../../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import useDeleteContractor from "../../../hooks/contractor/useDeleteContractor";

interface ModalDeleteContractorProps {
    isOpen: boolean;
    onClose: () => void;
    contractorId: number;
}

const ModalDeleteContractor = ({isOpen, onClose, contractorId}: ModalDeleteContractorProps) => {
    const {mutate, isSuccess} = useDeleteContractor();

    useEffect(() => {
        if (!isSuccess) return;
        onClose();
    }, [isSuccess]);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz kontrahenta?</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                    <Button variant="contained" type="submit" onClick={() => mutate(contractorId)}> Usuń </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default ModalDeleteContractor;
