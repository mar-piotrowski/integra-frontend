import {Button, Grid} from "@mui/material";
import React, {useEffect} from "react";
import CustomModal from "../../components/CustomModal";
import FormInput from "../../components/Form/FormInput";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Header from "../../components/CustomModalHeader";
import FormCheckBox from "../../components/Form/FormCheckBox";
import useCreateCard from "../../hooks/card/useCreateCard";
import {useParams} from "react-router-dom";

interface ModalCreateCardProps {
    isOpen: boolean;
    onClose: () => void;
}

type CreateCardForm = {
    number: string;
    active: boolean;
}

const defaultValues: CreateCardForm = {
    number: "",
    active: false
}

const validation = z.object({
    number: z.string().min(6, "Karta musi zawierac minimum 6 znakow"),
    active: z.boolean()
})

const ModalCreateCard = ({isOpen, onClose}: ModalCreateCardProps) => {
    const {userId} = useParams();
    const {mutate, isSuccess} = useCreateCard();
    const {control, handleSubmit} = useForm<CreateCardForm>({
        defaultValues,
        resolver: zodResolver(validation)
    })

    useEffect(() => {
       if(isSuccess)
           onClose();
    }, [isSuccess]);

    const submitHandler: SubmitHandler<CreateCardForm> = (data) => {
        mutate({...data, userId: parseInt(userId!)});
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Header title={"Dodawanie karty"}/>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormInput name={"number"} label={"Numer karty"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormCheckBox name={"active"} label={"Aktywuj"} control={control}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                        <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                        <Button variant="contained" type="submit"> Dodaj </Button>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    );
}

export default ModalCreateCard;