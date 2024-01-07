import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
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

const WZ = () => {
    const [contractor, setContractor] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithTax, setTotalPriceWithTax] = useState(0);
    const [contractorModal, setContractorModal] = useState(false);
    const { control, handleSubmit, watch } = useForm<GoodsReceivedNoteForm>({
        defaultValues,
    });
    const watchArticles = watch(["articles"]);

    useEffect(() => {
        if (watchArticles[0].length != 0) {
            const totalPrice = watchArticles[0].reduce((acc, curr) => acc += curr.totalPriceWithoutTax, 0);
            const totalPriceWithTax = watchArticles[0].reduce((acc, curr) => acc += curr.totalPriceWithTax, 0);
            setTotalPrice(totalPrice);
            setTotalPriceWithTax(totalPriceWithTax);
        } else {
            setTotalPrice(0);
            setTotalPriceWithTax(0);
        }

    }, [watchArticles]);

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
                        <Typography variant={"h2"}>Wystawianie dokumentu WZ</Typography>
                    </Grid>
                    <Grid container item md={6} lg={6}>
                        <Grid item>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="h4" sx={{ marginBottom: 1 }}>Dostawca</Typography>
                                <div><span> <b>Nazwa: </b> </span> abc</div>
                                <div><span> <b>NIP: </b> </span> abc</div>
                                <div><span> <b>Adres: </b> </span> abc</div>
                                <Button variant={"contained"} onClick={openContractorModalHandle}>
                                    Dodaj kontrahenta
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item md={12} lg={6} spacing={2}>
                        <Grid item xs={12}>
                            <FormInput label={"Numer dokumentu"} name={"stockId"} control={control} />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Utwórz automatycznie" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormDate label={"Data wystawienia"} name={"issueDate"} control={control} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormDate label={"Data wydania"} name={"receptionDate"} control={control} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput name={"discount"} label={"Rabat"} control={control} type={"number"} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}>Razem netto: {totalPrice} zł</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h4"}>Razem brutto: {totalPriceWithTax} zł</Typography>
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

export default WZ;