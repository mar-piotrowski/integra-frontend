import {Control, useWatch} from "react-hook-form";
import {CreateUserRequest} from "../../../../../api/types/userTypes";
import React from "react";
import {Grid, Typography} from "@mui/material";
import FormCheckBox from "../../../../../components/Form/FormCheckBox";

interface ModalAddUserEmployeePanel {
    control: Control<CreateUserRequest>;
}

const ModalAddUserEmployeePanel = ({control}: ModalAddUserEmployeePanel) => {
    const createAccountWatch = useWatch({name: "createAccount", control});
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h5"}>Konto w panelu pracownika</Typography>
                <FormCheckBox name={"createAccount"} label={"Utwórz"} control={control}/>
            </Grid>
            {
                createAccountWatch
                    ? <Grid item>
                        <Typography variant={"h5"} color={"error"}>
                            Na adres email zostanie wysłany link do utworzenia hasła
                        </Typography>
                    </Grid>
                    : null
            }
        </Grid>
    )
};

export default ModalAddUserEmployeePanel;