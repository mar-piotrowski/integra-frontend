import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { DialogProps } from "../../interfaces/dialog"
import React, { useEffect } from "react"
import useCancelContract from "../../hooks/contract/useCancelContract"

interface CancelContractDialogProps extends DialogProps {
    contractId: number;
}

const CancelContractDialog = ({ isOpen: open, onClose, contractId }: CancelContractDialogProps) => {
    const { mutate: cancelContractMutate, isSuccess } = useCancelContract();

    useEffect(() => {
        if (isSuccess)
            onClose();
    }, [isSuccess])

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Czy napewno chcesz anulować umowę?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>Wyjdź</Button>
                <Button variant={"contained"} color={"error"} onClick={() => { cancelContractMutate(contractId) }}>
                    Anuluj
                </Button>
            </DialogActions>
        </Dialog>


    )
}

export default CancelContractDialog;