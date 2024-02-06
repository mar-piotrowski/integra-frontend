import React from "react";
import {Grid, ListItemButton, ListItemText} from "@mui/material";
import {ContractorDto} from "../../../../api/types/contractorTypes";

interface ModalContractorListItemProps {
    contractor: ContractorDto;
    onClick: () => void;
}

const ModalContractorListItem = ({contractor, onClick}: ModalContractorListItemProps) => {
    return (
        <ListItemButton sx={{marginTop: 1, marginBottom: 1}} onClick={onClick}>
            <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <ListItemText primary={`Nazwa: ${contractor.fullName}`}/>
                </Grid>
                <Grid item>
                    <ListItemText primary={`Nip: ${contractor.nip}`}/>
                </Grid>
            </Grid>
        </ListItemButton>
    )
}

export default ModalContractorListItem;