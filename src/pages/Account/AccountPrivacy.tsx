import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {Box} from "@mui/system";
import ModalChangePassword from "./components/ModalChangePassword";
import {useBoolean} from "../../hooks/useBoolean";

const AccountPrivacy = () => {
    const {
        value: changePasswordModal,
        setTrue: openChangePasswordModal,
        setFalse: closeChangePasswordModal
    } = useBoolean(false);

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Zabezpieczenia</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{display: "flex", width: "300px", justifyContent: "space-between"}}>
                            <Box>
                                <Typography variant="subtitle1">Hasło</Typography>
                                <Typography variant="subtitle2">***************</Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant={"contained"}
                                    onClick={openChangePasswordModal}
                                    disableElevation
                                >
                                    Zmień hasło
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{display: "flex", width: "300px", justifyContent: "space-between", flexGrow: 1}}>
                            <Box>
                                <Typography variant="subtitle1">Email</Typography>
                                <Typography variant="subtitle2">email@email.com</Typography>
                            </Box>
                            <Box>
                                <Button variant={"contained"} disableElevation>Zmień Email</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {
                changePasswordModal
                    ? <ModalChangePassword isOpen={changePasswordModal} onClose={closeChangePasswordModal}/>
                    : null
            }
        </>
    );
};

export default AccountPrivacy;
