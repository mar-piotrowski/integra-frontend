import {Box, Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import ShowAmount from "../components/ShowAmount";
import CustomTable from "../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {useMemo, useState} from "react";
import {mockData, Person} from "./Employees";
import {MRT_ColumnDef} from "material-react-table";
import ModalAddArticle from "../features/ModalAddArticle";
import modalAddArticle from "../features/ModalAddArticle";

interface Article {
    id: number;
    groupId: number;
    name: string;
    code: string;
    type: number;
    gtin: string;
    measure_unit: string;
    buyPrice: number;
    buyCurrency: number;
    vat: number;
    amount: number;
    description: string;
}

const mockArticles: Article[] = [
    {
        id: 1,
        groupId: 1,
        name: "Kubek",
        code: "123",
        type: 1,
        gtin: "34123",
        measure_unit: "szt",
        buyPrice: 12,
        buyCurrency: 2,
        amount: 123,
        vat: 23,
        description: "szklanka"
    }
]

const Articles = () => {
    const [articleModal, setArticleModal] = useState<boolean>(false);
    const columns = useMemo<MRT_ColumnDef<Article>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Id",
            },
            {
                accessorKey: "name",
                header: "Nazwa",
            },
            {
                accessorKey: "groupId",
                header: "Grupa",
            },
            {
                accessorKey: "amount",
                header: "Stans",
            },
        ],
        []
    );

    const openModalHandler = () => setArticleModal(true);

    const closeModalHandler = () => setArticleModal(false);

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={10}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openModalHandler}
                        >
                            Dodaj produkt
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={3} lg={2}>
                        <ShowAmount label="Ilosc produktow" value={100} color="blue"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomTable
                            columns={columns}
                            data={mockArticles}
                            renderRowActionMenuItems={() => [
                                <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Edytuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Usuń</ListItemText>
                                </MenuItem>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
            {articleModal ? <ModalAddArticle open={articleModal} onClose={closeModalHandler}/> : null}
        </>
    )
}

export default Articles;