import {useParams} from "react-router-dom";
import React, {useMemo, useState} from "react";
import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import {CardDto} from "../../api/types/cardTypes";
import {MRT_ColumnDef} from "material-react-table";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {cardStatusMapper} from "../../utils/cardUtils";
import {toDateString} from "../../utils/dateHelper";
import {useBoolean} from "../../hooks/useBoolean";
import ModalDeleteCard from "../../features/modals/ModalDeleteCard";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModalCreateCard from "../../features/modals/ModalCreateCard";
import useActiveCard from "../../hooks/card/useActiveCard";
import useDeActiveCard from "../../hooks/card/useDeActiveCard";
import useCards from "../../hooks/card/useCards";

const ProfileUserCards = () => {
    const {userId} = useParams();
    const [cardNumber, setCardNumber] = useState<string>("");
    const {
        value: deleteCardModal,
        setTrue: openDeleteCardModal,
        setFalse: closeDeleteCardModal
    } = useBoolean(false);
    const {
        value: createCardModal,
        setTrue: openCreateCardModal,
        setFalse: closeCreateCardModal
    } = useBoolean(false);
    const {data: cards} = useCards(parseInt(userId!));
    const {mutate: activeCardMutate} = useActiveCard(parseInt(userId!));
    const {mutate: deActiveCardMutate} = useDeActiveCard(parseInt(userId!));

    const columns = useMemo<MRT_ColumnDef<CardDto>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer karty"
            },
            {
                accessorKey: "assignmentDate",
                header: "Data przypisania",
                Cell: ({row}) => <div>{toDateString(row.original.assignmentDate)}</div>
            },
            {
                accessorKey: "active",
                header: "Status",
                Cell: ({row}) => <div>{cardStatusMapper(row.original.active)}</div>
            }
        ], []
    );

    const handleCloseDeleteCardModal = () => {
        closeDeleteCardModal();
        setCardNumber("");
    }

    return (
        <>
            <Grid container>
                <Grid item container>
                    <Grid item xs={12}>
                        <Button
                            disableElevation
                            variant={"contained"}
                            onClick={openCreateCardModal}
                        >Dodaj kartę</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={cards ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({closeMenu, row}) => [
                            <MenuItem key="delete" onClick={() => {
                                closeMenu();
                                activeCardMutate(row.original.number);
                            }}>
                                <ListItemIcon>
                                    <CheckIcon/>
                                </ListItemIcon>
                                <ListItemText>Aktywuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                closeMenu();
                                deActiveCardMutate(row.original.number);
                            }}>
                                <ListItemIcon>
                                    <CloseOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Dezaktywuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                closeMenu();
                                setCardNumber(row.original.number);
                                openDeleteCardModal();
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
                createCardModal
                    ? <ModalCreateCard isOpen={createCardModal} onClose={closeCreateCardModal}/>
                    : null
            }
            {
                deleteCardModal
                    ? <ModalDeleteCard
                        isOpen={deleteCardModal}
                        onClose={handleCloseDeleteCardModal}
                        cardNumber={cardNumber}
                    />
                    : null
            }
        </>
    )
}

export default ProfileUserCards;