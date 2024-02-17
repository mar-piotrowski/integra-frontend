import CustomModal from "../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import useDeleteWorkingTime from "../../hooks/workingTime/useDeleteWorkingTime";
import {useParams} from "react-router-dom";

interface ModalDeleteWorkingTimeProps {
    isOpen: boolean;
    onClose: () => void;
    workingTimeId: number;
}

const ModalDeleteWorkingTime = ({isOpen, onClose, workingTimeId}: ModalDeleteWorkingTimeProps) => {
    const {userId} = useParams();
    const {mutate, isSuccess} = useDeleteWorkingTime(parseInt(userId!));

    useEffect(() => {
        if (isSuccess)
            onClose();
    }, [isSuccess]);


    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz czas pracy?</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={() => mutate(workingTimeId)}>
                        Usuń
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalDeleteWorkingTime;