import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import ShowAmount from "../../components/ShowAmount";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import ModalArticle from "../../features/modals/addArticle/ModalArticle";
import { ArticleDto } from "../../api/types/articleTypes";
import { useArticles } from "../../hooks/article/useArticles";
import { useBoolean } from "../../hooks/useBoolean";
import ModalArticleDelete from "../../features/modals/ModalArticleDelete";

const Articles = () => {
    const {
        value: deleteArticleModal,
        setTrue: openDeleteArticleModal,
        setFalse: closeDeleteArticleModal
    } = useBoolean(false);
    const {
        value: createArticleModal,
        setTrue: openCreateArticleModal,
        setFalse: closeCreateArticleModal
    } = useBoolean(false);
    const { data: articles } = useArticles();
    const [articleToEdit, setArtileToEdit] = useState<ArticleDto | null>(null);

    const columns = useMemo<MRT_ColumnDef<ArticleDto>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Kod produktu",
                size: 100
            },
            {
                accessorKey: "name",
                header: "Nazwa",
            },
            {
                accessorKey: "measureUnit",
                header: "Jednostka miary",
                size: 50
            },
            {
                accessorKey: "stockAmount",
                header: "Stan",
                size: 100
            },
            {
                accessorKey: "sellPriceWithTax",
                header: "Cena sprz. brutto",
                size: 100
            },
            {
                accessorKey: "sellPriceWithoutTax",
                header: "Cena sprz. netto",
                size: 100
            },
        ],
        []
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="contained" disableElevation onClick={openCreateArticleModal}>
                        Dodaj produkt
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                    <ShowAmount label="Ilosc produktow" value={100} color="blue" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <CustomTable
                        columns={columns}
                        data={articles ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({ row, closeMenu }) => [
                            <MenuItem key="edit" onClick={() => {
                                setArtileToEdit({ ...row.original });
                                closeMenu();
                                openCreateArticleModal();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                setArtileToEdit({ ...row.original });
                                closeMenu();
                                openDeleteArticleModal();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {
                createArticleModal
                    ? <ModalArticle
                        open={createArticleModal}
                        onClose={closeCreateArticleModal}
                        articleToEdit={articleToEdit}
                    />
                    : null
            }
            {
                deleteArticleModal
                    ? <ModalArticleDelete
                        open={deleteArticleModal}
                        onClose={closeDeleteArticleModal}
                        articleId={articleToEdit!.id}
                    />
                    : null
            }
        </>
    )
}

export default Articles;