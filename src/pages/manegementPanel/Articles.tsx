import { Box, Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import ShowAmount from "../../components/ShowAmount";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import ModalAddArticle from "../../features/modals/addArticle/ModalAddArticle";
import ButtonDropdown, { ButtonDropdownItem } from "../../components/ButtonDropdown";
import { ArticleDto } from "../../api/types/articleTypes";

const issueMenuItems: ButtonDropdownItem[] = [
    {
        label: "Wydanie zewnetrzne",
        to: "/management-panel/wz"
    },
    {
        label: "Rozchód wewnętrzny",
        to: "/management-panel/rw"
    }
]

const receptionMenuItems: ButtonDropdownItem[] = [
    {
        label: "Przyjęcie wewnętrzne",
        to: "/management-panel/pw"
    },
    {
        label: "Przyjęcie zewnętrzne",
        to: "/management-panel/pz"
    }
]

const Articles = () => {
    const [articleModal, setArticleModal] = useState<boolean>(false);
    const columns = useMemo<MRT_ColumnDef<ArticleDto>[]>(
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
                accessorKey: "id",
                header: "Stan",
            },
        ],
        []
    );

    const openModalHandler = () => setArticleModal(true);

    const closeModalHandler = () => setArticleModal(false);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openModalHandler}
                        >
                            Dodaj produkt
                        </Button>
                    </Grid>
                    <Grid item>
                        <ButtonDropdown label={"Wydanie"} items={issueMenuItems} />
                    </Grid>
                    <Grid item>
                        <ButtonDropdown label={"Przyjęcie"} items={receptionMenuItems} />
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <ShowAmount label="Ilosc produktow" value={100} color="blue" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomTable
                            columns={columns}
                            data={[]}
                            renderRowActionMenuItems={() => [
                                <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Edytuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Usuń</ListItemText>
                                </MenuItem>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
            <ModalAddArticle open={articleModal} onClose={closeModalHandler} />
        </>
    )
}

export default Articles;