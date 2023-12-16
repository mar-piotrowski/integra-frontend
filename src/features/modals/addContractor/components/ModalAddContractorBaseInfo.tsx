import React from "react";
import {Grid} from "@mui/material";
import FormInput from "../../../../components/form/FormInput";
import {CreateContractorRequest} from "../../../../api/types/contractorTypes";
import {Control} from "react-hook-form";

interface ModalAddContractorBaseInfoProps {
    control: Control<CreateContractorRequest>;
}

const ModalAddContractorBaseInfo = ({control}: ModalAddContractorBaseInfoProps) => {
    return (
        <Grid sx={{flexGrow: 1}} container spacing={2}>
            <Grid item xs={12} md={6}>
                <FormInput control={control} label={"Pełna nazwa firmy"} name={"fullName"}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput control={control} label={"Skrócona nazwa firmy"} name={"shortName"}/>
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"Reprezentant"} name={"representative"}/>
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"NIP"} name={"nip"}/>
            </Grid>
        </Grid>
    )
}

export default ModalAddContractorBaseInfo;