import React from "react";
import CustomModal from "../../../components/CustomModal";
import {ModalBaseProps} from "../../../interfaces/modal";
import {Button, Grid, TextField, Typography} from "@mui/material";
import useGetContractors from "../../../hooks/contractor/useGetContractors";
import ModalContractorListItem from "./components/ModalContractorListItem";
import {ContractorDto} from "../../../api/types/contractorTypes";
import ContactorModal from "../addContractor/ContactorModal";
import {useBoolean} from "../../../hooks/useBoolean";

interface ModalSupplierProps extends ModalBaseProps {
    setContractor: (contractor: ContractorDto) => void;
}

const ModalDocumentContractors = ({open, onClose, setContractor}: ModalSupplierProps) => {
    const {data: contractors} = useGetContractors();
    const {
        value: createContractorModal,
        setTrue: openCreateContractorModal,
        setFalse: closeCreateContractorModal
    } = useBoolean();

    const renderContractors = contractors?.map(contractor =>
        <ModalContractorListItem
            key={contractor.id}
            contractor={contractor}
            onClick={() => {
                setContractor(contractor);
                onClose();
            }}
        />
    )

    return (
        <>
            <CustomModal isOpen={open} onClose={onClose}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h3"} mb={2}>Lista kontrahentów</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={"Wyszukaj kontrahenta"} fullWidth/>
                    </Grid>
                    <Grid item xs={12} height={"400px"}>
                        {renderContractors}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={"outlined"} fullWidth onClick={openCreateContractorModal}>Dodaj nowego kontrahenta</Button>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"} mt={1}>
                        <Button size={"large"} onClick={onClose}>Wyjdź</Button>
                    </Grid>
                </Grid>
            </CustomModal>
            <ContactorModal open={createContractorModal} onClose={closeCreateContractorModal}  />
        </>
    )
}
export default ModalDocumentContractors;