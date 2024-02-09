import {Grid} from "@mui/material";
import FormDate from "../../../../../components/Form/FormDate";
import FormInput from "../../../../../components/Form/FormInput";
import React from "react";
import {Control} from "react-hook-form";
import {CreateUserRequest} from "../../../../../api/types/userTypes";

interface ModalWorkerDetailsProps {
    control: Control<CreateUserRequest>;
}

const ModalAddEmployeeDetails = ({control}: ModalWorkerDetailsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <FormInput name="placeOfBirth" label="Miejsce urodzenia" control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name="dateOfBirth" label="Data urodzenie" control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name="citizenship" label="Obywatelstwo" control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name="identityNumber" label="Numer dowodu" control={control}/>
            </Grid>
        </Grid>
    );
};

export default ModalAddEmployeeDetails;
