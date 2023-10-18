import React from "react";
import {Grid, ListItemButton, ListItemText} from "@mui/material";

interface ModalContractorListItemProps {
    name: string;
    nip: number;
    onClick: () => void;
}

const ModalContractorListItem = ({name, nip, onClick}: ModalContractorListItemProps) => {
    return (
        <ListItemButton sx={{marginTop: 1, marginBottom: 1}} onClick={onClick}>
            <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <ListItemText primary={`Nazwa: ${name}`}/>
                </Grid>
                <Grid item>
                    <ListItemText primary={`Nip: ${nip}`}/>
                </Grid>
            </Grid>
        </ListItemButton>
    )
}

export default ModalContractorListItem;