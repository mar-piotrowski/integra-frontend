import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import FormDate from "../../../components/form/FormDate";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import ArticleDocument from "../../../features/ArticleDocument";
import { DocumentArticle } from "../../../constants/models";
import ModalSupplier from "../../../features/modals/supplier/ModalSupplier";

export interface GoodsReceivedNoteForm {
    documentNumber: string;
    issueDate: string;
    receptionDate: string;
    paymentDate: string;
    stockId: number;
    sellerId: number;
    currency: string;
    articles: DocumentArticle[]
}

const defaultValues: GoodsReceivedNoteForm = {
    documentNumber: "",
    issueDate: "",
    receptionDate: "",
    paymentDate: "",
    stockId: 0,
    sellerId: 0,
    currency: "",
    articles: []
}

const mockContractors = [
    {
        id: 1,
        name: "MarBud",
        nip: 12312312,
    },
    {
        id: 2,
        name: "RobBud",
        nip: 1231764575
    },
    {
        id: 3,
        name: "Januszex",
        nip: 1231231123122
    }
]

const RW = () => {
    const [contractor, setContractor] = useState<number | null>(null);
    const [contractorModal, setContractorModal] = useState(false);
    const { control, handleSubmit } = useForm<GoodsReceivedNoteForm>({
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<GoodsReceivedNoteForm> = (data) => {
        console.log(data);
    };

    const openContractorModalHandle = () => setContractorModal(true);

    const closeContractorModalHandle = () => setContractorModal(false);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h2"}>Wystawianie dokumentu RW</Typography>
                    </Grid>
                    <Grid container item md={6} lg={6}>
                        <Grid item>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="h4" sx={{ marginBottom: 1 }}>Dostawca</Typography>
                                <div><span> <b>Nazwa: </b> </span> Marcinex</div>
                                <div><span> <b>NIP: </b> </span> Marcinex</div>
                                <div><span> <b>Adres: </b> </span> Marcinex</div>
                                <Button variant={"contained"} onClick={openContractorModalHandle}>Dodaj
                                    dostawcę</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item md={12} lg={6} spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormInput name={"documentNumber"} label={"Numer faktury"} control={control} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormInput name={"stockId"} label={"Magazyn"} control={control} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormDate label={"Data wystawienia"} name={"issueDate"} control={control} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormDate label={"Data wpływu"} name={"paymentDate"} control={control} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormDate label={"Data odbioru"} name={"receptionDate"} control={control} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} mb={1}>Produkty</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <ArticleDocument control={control} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                        }}
                    >
                        <Button variant="contained" color="error">
                            Anuluj
                        </Button>
                        <Button variant="contained" type="submit">
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ModalSupplier
                open={contractorModal}
                onClose={closeContractorModalHandle}
                contractors={mockContractors}
                setContractor={setContractor}
            />
        </>
    )
}
export default RW;