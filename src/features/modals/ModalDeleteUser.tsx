import CustomModal from "../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import useDeleteUser from "../../hooks/employee/useDeleteUser";

interface ModalDeleteCardProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

const ModalDeleteUser = ({isOpen, onClose, userId}: ModalDeleteCardProps) => {
    const {mutate, isSuccess, isError} = useDeleteUser();

    useEffect(() => {
        if (isSuccess || isError)
            onClose();
    }, [isSuccess, isError]);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz usunąć pracownika?</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                    <Button variant="contained" type="submit" onClick={() => mutate(userId)}> Usuń </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalDeleteUser;