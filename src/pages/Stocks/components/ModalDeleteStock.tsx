import React, {useEffect} from "react";
import CustomModal from "../../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import useDeleteStock from "../../../hooks/stock/useDeleteStock";

interface ModalDeleteStockProps {
    isOpen: boolean;
    onClose: () => void;
    stockId: number;
}

const ModalDeleteStock = ({isOpen, onClose, stockId}: ModalDeleteStockProps) => {
    const {mutate, isSuccess} = useDeleteStock();

    useEffect(() => {
        if (!isSuccess) return;
        onClose();
    }, [isSuccess]);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz usunąć magazyn?</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                    <Button variant="contained" type="submit" onClick={() => mutate(stockId)}> Usuń </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default ModalDeleteStock;