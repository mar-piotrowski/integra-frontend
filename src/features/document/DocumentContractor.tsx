import {Grid, Typography, Button} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useBoolean} from "../../hooks/useBoolean";
import Mo from "../modals/supplier/ModalDocumentContractors";
import {Control, useWatch} from "react-hook-form";
import {ContractorDto} from "../../api/types/contractorTypes";
import {DocumentDetails} from "../../api/types/documentTypes";
import ModalDocumentContractors from "../modals/supplier/ModalDocumentContractors";
import ModalContractor from "../modals/addContractor/ModalContractor";

interface DocumentContractorProps {
    setContractor: (contractor: ContractorDto) => void;
    control: Control<DocumentDetails>;
}

const DocumentContractor = ({setContractor, control}: DocumentContractorProps) => {
    const {
        value: contractorsModal,
        setTrue: openContractorsModal,
        setFalse: closeContractorsModal
    } = useBoolean(false);

    const contractorWatch = useWatch({name: "contractor", control});

    return (
        <>
            <Grid container item md={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dane kontrahenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        contractorWatch != null
                            ? <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                                padding: "10px",
                                borderRadius: 1,
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
                            }}>
                                <Typography variant={"h4"}>{contractorWatch.fullName}</Typography>
                                <Typography variant={"body1"}>{contractorWatch.location.street}</Typography>
                                <Typography variant={"body1"}>{contractorWatch.location.postalCode} {contractorWatch.location.city}</Typography>
                                <Typography variant={"body1"}>NIP {contractorWatch.nip}</Typography>
                            </Box>
                            : null
                    }
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={openContractorsModal}>
                        {contractorWatch == null ? "Dodaj kontrahenta": "Edytuj kontrahenta"}
                    </Button>
                </Grid>
            </Grid>
            {
                contractorsModal
                    ? <ModalDocumentContractors
                        open={contractorsModal}
                        onClose={closeContractorsModal}
                        setContractor={setContractor}
                    />
                    : null
            }
        </>
    );
};

export default DocumentContractor;