import { Control } from "react-hook-form";
import { Grid } from "@mui/material";
import React from "react";
import FormInput from "../../../../../components/Form/FormInput";
import { CreateUserRequest } from "../../../../../api/types/userTypes";

interface ModalWorkerAddressProps {
    control: Control<CreateUserRequest>;
}

const ModalAddEmployeeAddress = ({ control }: ModalWorkerAddressProps) => {
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12} md={6}>
                <FormInput name="locations[0].city" label="Miasto" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput
                    name="location.postalCode"
                    label="Kod pocztowy"
                    control={control}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name="location.street" label="Ulica" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput
                    name="location.houseNo"
                    label="Numer domu"
                    control={control}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput
                    name="location.apartmentNo"
                    label="Numer mieszkania"
                    control={control}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name="location.commune" label="Gmina" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name="location.district" label="Powiat" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput
                    name="location.province"
                    label="Wojewodztwo"
                    control={control}
                />
            </Grid>
            <Grid item xs={12}>
                <FormInput name="location.country" label="Kraj" control={control} />
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*    <FormCheckBoxes*/}
            {/*        label=""*/}
            {/*        name="abc"*/}
            {/*        control={control}*/}
            {/*        options={addressType}*/}
            {/*    />*/}
            {/*</Grid>*/}
        </Grid>
    );
};

export default ModalAddEmployeeAddress;
