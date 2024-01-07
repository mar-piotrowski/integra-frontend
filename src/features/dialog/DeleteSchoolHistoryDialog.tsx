import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DialogProps } from "../../interfaces/dialog";
import useDeleteSchoolHistory from "../../hooks/schoolHistory/useDeleteSchoolHistory";

interface DeleteSchoolHistoryDialogProps extends DialogProps {
    schoolHistoryId: number;
}

const DeleteSchoolHistoryDialog = ({ isOpen: open, onClose, schoolHistoryId }: DeleteSchoolHistoryDialogProps) => {
    const { mutate, isSuccess } = useDeleteSchoolHistory(schoolHistoryId);

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
            <DialogTitle id="alert-dialog-title">Usuwanie historii wyksztalcenia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Czy napewno chcesz usunąć historię wykształcenia?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>Anuluj</Button>
                <Button variant={"contained"} color={"error"} onClick={() => mutate()}>Usuń</Button>
            </DialogActions>
        </Dialog>

    )
};

export default DeleteSchoolHistoryDialog;