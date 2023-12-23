import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { DialogProps } from "../../interfaces/dialog"
import React from "react"
import { useNavigate } from "react-router-dom"
import { UseFormReset } from "react-hook-form"
import { Contract } from "../../api/types/documentTypes"

interface CancelContractDialogProps extends DialogProps {
    reset: UseFormReset<Contract>;
}

const CancelCreateContractDialog = ({ isOpen: open, onClose, reset }: CancelContractDialogProps) => {
    const navigate = useNavigate();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Czy napewno chcesz wyjść z tworzenia umowy?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>Zostań</Button>
                <Button variant={"contained"} color={"error"} onClick={() => {
                    onClose();
                    navigate(-1);
                    reset();
                }}>
                    Wyjdź</Button>
            </DialogActions>
        </Dialog>


    )
}

export default CancelCreateContractDialog;