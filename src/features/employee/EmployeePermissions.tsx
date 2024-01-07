import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import HeaderAction from "../../components/HeaderAction";
import CustomTable from "../../components/CustomTable";
import { errorToast } from "../../utils/toastUtil";

interface EmployeePermissions {
    permissions: number[];
    manage: boolean;
}

const EmployeePermissions = ({ permissions, manage }: EmployeePermissions) => {

    const handleAddPermission = () => {
        errorToast("Nie masz oprawnień!")
    }

    return (
        <Grid container xs={12}>
            {
                manage ?
                    <Grid item xs={12}>
                        <HeaderAction title="Uprawnienia">
                            <Button variant="contained" size="small" onClick={handleAddPermission}>Dodaj</Button>
                        </HeaderAction>
                    </Grid>
                    : <Grid item>
                        <Typography variant="h4">Uprawnieni</Typography>
                    </Grid>
            }
            <Grid item xs={12}>
                <CustomTable data={[]} columns={[]} />
            </Grid>
        </Grid>
    )
};

export default EmployeePermissions;