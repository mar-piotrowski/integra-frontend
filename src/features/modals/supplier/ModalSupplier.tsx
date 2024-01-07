import React, { Dispatch, SetStateAction } from "react";
import CustomModal from "../../../components/CustomModal";
import { ModalBaseProps } from "../../../interfaces/modal";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ModalContractorListItem from "./components/ModalContractorListItem";

interface ModalSupplierProps extends ModalBaseProps {
    contractors: { id: number, name: string, nip: number }[]
    setContractor: Dispatch<SetStateAction<number | null>>;
}

const ModalSupplier = ({ open, onClose, contractors, setContractor }: ModalSupplierProps) => {
    const onSelectContractorHandler = (id: number) => {
        setContractor(id);
        onClose();
    }

    const renderContractors = contractors.map(item =>
        <ModalContractorListItem
            key={item.id}
            name={item.name}
            nip={item.nip}
            onClick={() => onSelectContractorHandler(item.id)}
        />
    )

    return (
        <CustomModal isOpen={open} onClose={onClose}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"h3"} mb={2}>Lista kontrahentów</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label={"Wyszukaj kontrahenta"} fullWidth />
                </Grid>
                <Grid item xs={12} height={"400px"}>
                    {renderContractors}
                </Grid>
                <Grid item xs={12}>
                    <Button variant={"outlined"} fullWidth>Dodaj nowego kontrahenta</Button>
                </Grid>
                <Grid item container justifyContent={"flex-end"} mt={1}>
                    <Button size={"large"} onClick={onClose}>Wyjdź</Button>
                </Grid>
            </Grid>
        </CustomModal>
    )
}
export default ModalSupplier;