import {StockDto} from "../../../api/types/stockTypes";
import React, {useEffect} from "react";
import CustomModal from "../../../components/CustomModal";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {JobHistory} from "../../../api/types/documentTypes";
import {Button, Grid} from "@mui/material";
import Header from "../../../components/CustomModalHeader";
import FormInput from "../../../components/Form/FormInput";
import FormTextField from "../../../components/Form/FormTextField";
import FormCheckBox from "../../../components/Form/FormCheckBox";
import useEditStock from "../../../hooks/stock/useEditStock";
import useCreateStock from "../../../hooks/stock/useCreateStock";

interface ModalCreateStock {
    isOpen: boolean;
    onClose: () => void;
    stock?: StockDto | null
}

type CreateStockForm = {
    name: string;
    isMain: boolean;
    description?: string | null;
}

const defaultValues: CreateStockForm = {
    name: "",
    isMain: false,
    description: null
}

const validation = z.object({
    name: z.string().min(1, "Pole wymagane"),
    isMain: z.boolean(),
    description: z.string().optional().nullable()
})

const ModalCreateStock = ({isOpen, onClose, stock}: ModalCreateStock) => {
    const {mutate: createStockMutate, isSuccess: createStockSuccess} = useCreateStock();
    const {mutate: editStockMutate, isSuccess: editStockSuccess} = useEditStock();
    const {control, handleSubmit, reset} = useForm<CreateStockForm>({
        defaultValues,
        resolver: zodResolver(validation)
    });

    useEffect(() => {
        if(stock != undefined)
            reset(stock);
    }, [isOpen, stock]);

    useEffect(() => {
        if(!editStockSuccess) return;
        handleOnClose();
    }, [editStockSuccess]);
    
    useEffect(() => {
        if(!createStockSuccess) return;
        handleOnClose();
    }, [createStockSuccess]);
    
   const handleOnClose = () => {
      onClose();
      reset();
   }

    const onSubmitHandler: SubmitHandler<CreateStockForm> = (data) => {
        if (stock != undefined) {
            editStockMutate({...data, id: stock.id});
            return;
        }
        createStockMutate({...data});
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Header title={"Dodawanie magazynu"}/>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormInput name={"name"} label={"Nazwa"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormCheckBox name={"isMain"} label={"Ustaw jako główny"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField name={"description"} label={"Opis"} control={control}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                        <Button variant="contained" color="error" type="button" onClick={onClose}> Anuluj </Button>
                        <Button variant="contained" type="submit"> {stock == undefined ? "Dodaj" : "Edytuj"} </Button>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    );
};

export default ModalCreateStock;