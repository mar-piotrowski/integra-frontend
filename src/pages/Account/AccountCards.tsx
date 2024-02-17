import useAuth from "../../hooks/auth/useAuth";
import React, {useMemo} from "react";
import {Grid} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import {CardDto} from "../../api/types/cardTypes";
import {toDateString} from "../../utils/dateHelper";
import {cardStatusMapper} from "../../utils/cardUtils";
import useCards from "../../hooks/card/useCards";

const AccountCards = () => {
    const {auth} = useAuth();
    const {data: cards} = useCards(auth!.userId);

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

    return (
        <Grid container>
            <Grid item xs={12}>
                <CustomTable
                    columns={columns}
                    data={cards ?? []}
                />
            </Grid>
        </Grid>
    );
};

export default AccountCards;