import {DocumentArticleDto, DocumentDetails} from "../../api/types/documentTypes";
import React, {useMemo} from "react";
import {Button, Divider, Grid, Typography} from "@mui/material";
import Description from "../../components/Description";
import CustomModal from "../../components/CustomModal";
import Header from "../../components/CustomModalHeader";
import {toDateString} from "../../utils/dateHelper";
import {MRT_ColumnDef} from "material-react-table";
import CustomTable from "../../components/CustomTable";

interface ModalDocumentDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    document: DocumentDetails;
}

const ModalDocumentDetails = ({isOpen, onClose, document}: ModalDocumentDetailsProps) => {
    const columns = useMemo<MRT_ColumnDef<DocumentArticleDto>[]>(() => [
        {
            accessorKey: "name",
            header: "Nazwa"
        },
        {
            accessorKey: "code",
            header: "Kod"
        },
        {
            accessorKey: "amount",
            header: "Ilość"
        },
        {
            accessorKey: "sellPriceWithTax",
            header: "Suma brutto",
            Cell: ({row}) => <div>{row.original.sellPriceWithTax} zł</div>
        },
        {
            accessorKey: "sellPriceWithoutTax",
            header: "Suma netto",
            Cell: ({row}) => <div>{row.original.sellPriceWithoutTax} zł</div>
        },
    ], []);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header title={`Dane dokumentu ${document.number}`}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Typ"} value={document.type}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Zatwierdzona"} value={document.locked ? "Tak" : "Nie"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Numer"} value={document.number}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description
                        variant={"column"}
                        title={"Data wystawienia"}
                        value={toDateString(document.issueDate)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description
                        variant={"column"}
                        title={"Data przyjęcia"}
                        value={document.receptionDate != null ? toDateString(document.receptionDate) : "Brak"}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description
                        variant={"column"}
                        title={"Data zapłaty"}
                        value={document.paymentDate != null ? toDateString(document.paymentDate ?? "Brak") : "Brak"}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Zniżka"} value={document.discount}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Cena brutto"} value={`${document.totalAmountWithTax} zł`}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Description variant={"column"} title={"Cena netto"}
                                 value={`${document.totalAmountWithoutTax} zł`}/>
                </Grid>
                <Grid item xs={12}>
                    <Description variant={"column"} title={"Opis"} value={document.description ?? "Brak"}/>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h4"}>Artykuły</Typography>
                </Grid>
                <Grid item xs={12} maxHeight={"300px"}>
                    <CustomTable enableTopToolbar={false} columns={columns} data={document.articles}/>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"} onClick={onClose}>
                    <Button variant="contained" color={"error"}>Wyjdź</Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalDocumentDetails;