import React, { useEffect } from "react";
import CustomModal from "../../../components/CustomModal";
import { Button, Grid, Typography } from "@mui/material";
import useDeleteSchedule from "../../../hooks/schedule/useDeleteSchedule";

interface DeleteScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    scheduleId: number;
}

const DeleteScheduleModal = ({ isOpen, onClose, scheduleId }: DeleteScheduleModalProps) => {
    const { mutate, isSuccess } = useDeleteSchedule();

    useEffect(() => {
        if (!isSuccess) return;
        onClose();
    }, [isSuccess]);

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography variant="h4">Czy na pewno chcesz usunąć grafik?</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <Button variant="contained" type="submit" onClick={() => { mutate(scheduleId) }}>
                        Usuń
                    </Button>
                    <Button variant="contained" color="error" type="button" onClick={onClose}>
                        Anuluj
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default DeleteScheduleModal;