import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DialogProps } from "../../interfaces/dialog";
import useDeleteJobHistory from "../../hooks/workHistory/useDeleteJobHistory";
import {useParams} from "react-router-dom";

interface DeleteJobHistoryDialog extends DialogProps {
    jobHistoryId: number
}

const DeleteJobHistoryDialog = ({ isOpen: open, onClose, jobHistoryId }: DeleteJobHistoryDialog) => {
    const {userId} = useParams();
    const { mutate, isSuccess, reset } = useDeleteJobHistory(parseInt(userId!), jobHistoryId);

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess)
            handleExtendedOnClose();
    }, [isSuccess]);

    const handleExtendedOnClose = () => {
        reset();
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleExtendedOnClose}
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
                <Button variant={"contained"} onClick={handleExtendedOnClose}>Anuluj</Button>
                <Button variant={"contained"} color={"error"} onClick={() => mutate()}>Usuń</Button>
            </DialogActions>
        </Dialog>

    )
};

export default DeleteJobHistoryDialog;
