import {Button, Grid, ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";
import React, {useMemo} from "react";
import {StockArticleDto, StockDto} from "../../../api/types/stockTypes";
import Header from "../../../components/CustomModalHeader";
import Description from "../../../components/Description";
import CustomModal from "../../../components/CustomModal";
import {MRT_ColumnDef} from "material-react-table";
import CustomTable from "../../../components/CustomTable";

interface ModalStockDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    stock: StockDto;
}

const ModalStockDetails = ({isOpen, onClose, stock}: ModalStockDetailsProps) => {

    const columns = useMemo<MRT_ColumnDef<StockArticleDto>[]>(() => [
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
        }
    ], []);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header title={"Szczegóły magazynu"}/>
                </Grid>
                <Grid item container spacing={10}>
                    <Grid item>
                        <Description title={"Nazwa"} value={stock.name} variant={"column"}/>
                    </Grid>
                    <Grid item>
                        <Description title={"Ustawiony jako główny"} value={stock.isMain ? "Tak" : "Nie"}
                                     variant={"column"}/>
                    </Grid>
                    <Grid item>
                        <Description title={"Opis"} value={stock.description ?? "Brak"} variant={"column"}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable columns={columns} data={stock.articles}/>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                    <Button disableElevation color={"error"} variant={"contained"} onClick={onClose}>Wyjdź</Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalStockDetails;