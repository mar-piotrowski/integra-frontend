import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DialogProps } from "../../interfaces/dialog";
import useDeleteJobHistory from "../../hooks/workHistory/useDeleteJobHistory";

interface DeleteJobHistoryDialog extends DialogProps {
    jobHistoryId: number
}

const DeleteJobHistoryDialog = ({ open, onClose, jobHistoryId }: DeleteJobHistoryDialog) => {
    const { mutate, isSuccess } = useDeleteJobHistory(jobHistoryId);

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Usuwanie historii zatrudnienia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Czy napewno chcesz usunąć historię zatrudniena?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>Anuluj</Button>
                <Button variant={"contained"} color={"error"} onClick={() => mutate()}>Usuń</Button>
            </DialogActions>
        </Dialog>

    )
};

export default DeleteJobHistoryDialog;
