import {Control, UseFormSetValue} from "react-hook-form";
import {CreateUserRequest} from "../../../../../api/types/userTypes";
import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import FormInput from "../../../../../components/Form/FormInput";

interface ModalAddUserEmployeePanel {
    control: Control<CreateUserRequest>;
    setValue: UseFormSetValue<CreateUserRequest>;
}

const ModalAddUserEmployeePanel = ({control, setValue}: ModalAddUserEmployeePanel) => {
        const handleUserPassword = () => setValue("employeeAnyWherePassword", Math.random().toString(36).slice(2, 10));

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Podaj hasło do panelu pracownika</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormInput name={"employeeAnyWherePassword"} label={""} control={control}/>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={handleUserPassword}>Generuj hasło</Button>
                </Grid>
            </Grid>
        )
    }
;

export default ModalAddUserEmployeePanel;