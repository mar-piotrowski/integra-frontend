import CustomModal from "../../../components/CustomModal";
import React, {useEffect} from "react";
import {Button, Grid} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {ChangePasswordRequest} from "../../../api/types/authTypes";
import z from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "../../../components/Form/FormInput";
import useChangePassword from "../../../hooks/auth/useChangePassword";
import useAuth from "../../../hooks/auth/useAuth";
import Header from "../../../components/CustomModalHeader";

interface ModalChangePasswordProps {
    isOpen: boolean;
    onClose: () => void;
};

const defaultValues: ChangePasswordRequest = {
    userId: 0,
    currentPassword: "",
    newPassword: ""
}

const validation = z.object({
    userId: z.number(),
    currentPassword: z.string().min(8, "Hasło musi mieć conajmniej 8 znaków"),
    newPassword: z.string().min(8, "Hasło musi mieć conajmniej 8 znaków")
});

const ModalChangePassword = ({isOpen, onClose}: ModalChangePasswordProps) => {
    const {auth} = useAuth();
    const {mutate: changePasswordMutate, isSuccess: changePasswordSuccess} = useChangePassword();
    const {control, handleSubmit} = useForm<ChangePasswordRequest>({
        defaultValues,
        resolver: zodResolver(validation)
    });

    useEffect(() => {
        if (changePasswordSuccess)
            onClose();
    }, [changePasswordSuccess]);

    const onSubmitHandler: SubmitHandler<ChangePasswordRequest> = (data) => {
        changePasswordMutate({...data, userId: auth!.userId})
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header title={"Zmiana hasła"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInput type="password" name={"currentPassword"} label={"Aktualne hasło"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInput type="password" name={"newPassword"} label={"Nowe hasło"} control={control}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                        <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                        <Button variant="contained" type="submit"> Zmień hasło </Button>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    )
};

export default ModalChangePassword;