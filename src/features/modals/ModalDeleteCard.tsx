import CustomModal from "../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import useDeleteCard from "../../hooks/card/useDeleteCard";
import {useParams} from "react-router-dom";

interface ModalDeleteCardProps {
    isOpen: boolean;
    onClose: () => void;
    cardNumber: string;
}

const ModalDeleteCard = ({isOpen, onClose, cardNumber}: ModalDeleteCardProps) => {
    const {userId} = useParams();
    const {mutate, isSuccess} = useDeleteCard(parseInt(userId!));

    useEffect(() => {
       if(isSuccess)
           onClose();
    }, [isSuccess]);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz usunąć kartę?</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={() => mutate(cardNumber)}>
                        Usuń
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalDeleteCard;