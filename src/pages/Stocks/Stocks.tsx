import useStocks from "../../hooks/stock/useStocks";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {StockDto} from "../../api/types/stockTypes";
import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {useBoolean} from "../../hooks/useBoolean";
import ModalCreateStock from "./components/ModalCreateStock";
import ModalDeleteStock from "./components/ModalDeleteStock";
import ModalStockDetails from "./components/ModalStockDetails";

const Stocks = () => {
    const {data: stocks} = useStocks();
    const [stock, setStock] = useState<StockDto | null>(null);
    const {
        value: stockModal,
        setTrue: openStockModal,
        setFalse: closeStockModal
    } = useBoolean(false);
    const {
        value: stockDetailsModal,
        setTrue: openStockDetailsModal,
        setFalse: closeStockDetailsModal
    } = useBoolean(false);
    const {
        value: stockDeleteModal,
        setTrue: openStockDeleteModal,
        setFalse: closeStockDeleteModal
    } = useBoolean(false);

    const columns = useMemo<MRT_ColumnDef<StockDto>[]>(() => [
        {
            accessorKey: "name",
            header: "Nazwa"
        },
        {
            accessorKey: "isMain",
            header: "Główny",
            Cell: ({row}) => <div>{row.original.isMain ? "Tak" : "Nie"}</div>
        },
        {
            accessorKey: "totalProductsAmount",
            header: "Ilość produktów"
        }
    ], []);

    const handleCloseStockModal = () => {
        closeStockModal();
        setStock(null);
    }

    const handleCloseStockDetailsModal = () => {
        closeStockDetailsModal();
        setStock(null);
    }

    const handleCloseStockDeleteModal = () => {
        closeStockDeleteModal();
        setStock(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item container>
                    <Button disableElevation variant={"contained"} onClick={openStockModal}>Dodaj magazyn</Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={stocks ?? []}
                        enableRowActions
                        muiTableBodyRowProps={({row}) => ({
                            onClick: () => {
                                setStock(row.original)
                                openStockDetailsModal();
                            },
                            sx: {cursor: "pointer"}
                        })}
                        renderRowActionMenuItems={({row, closeMenu}) => [
                            <MenuItem key="edit" onClick={() => {
                                closeMenu();
                                setStock(row.original);
                                openStockModal();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                closeMenu();
                                setStock(row.original);
                                openStockDeleteModal();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {
                stockModal
                    ? <ModalCreateStock
                        isOpen={stockModal}
                        onClose={handleCloseStockModal}
                        stock={stock}
                    />
                    : null
            }
            {
                stockDeleteModal
                    ? <ModalDeleteStock
                        isOpen={stockDeleteModal}
                        onClose={handleCloseStockDeleteModal}
                        stockId={stock!.id}
                    />
                    : null
            }
            {
                stockDetailsModal
                    ? <ModalStockDetails
                        isOpen={stockDetailsModal}
                        onClose={handleCloseStockDetailsModal}
                        stock={stock!}
                    />
                    : null
            }
        </>
    );
};

export default Stocks;