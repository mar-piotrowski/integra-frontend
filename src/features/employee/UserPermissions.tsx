import {Grid, Button, Typography, useTheme, Box} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import ModalAddPermission from "../modals/addPermission/ModalAddPermission";
import {Permission} from "../../api/types/permissionTypes";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import useRemovePermissions from "../../hooks/permissions/useRemovePermissions";
import {useLocation, useParams} from "react-router-dom";

interface EmployeePermissions {
    permissions: Permission[];
    manage: boolean;
}

const UserPermissions = ({permissions, manage}: EmployeePermissions) => {
    const {userId} = useParams();
    const location = useLocation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const {mutate: removePermissionsMutate,} = useRemovePermissions();

    const columns = useMemo<MRT_ColumnDef<Permission>[]>(() => [
        {
            accessorKey: "name",
            header: "Nazwa",
        },
        {
            accessorKey: "asignmentDate",
            header: "Data nadania"
        },
    ], []);

    const handleOpenModal = () => setIsOpenModal(true);

    const handleCloseModal = () => setIsOpenModal(false);

    const handleRemovePermissions = (permissions: number[]) => {
        removePermissionsMutate({
            userId: parseInt(userId!),
            payload: {permissions}
        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h4">Uprawnienia</Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        enableTopToolbar={manage}
                        enableRowSelection={manage && location.pathname.includes("management-panel")}
                        columns={columns}
                        data={permissions ?? []}
                        renderTopToolbarCustomActions={({table}) =>
                            manage && location.pathname.includes("management-panel") ? (
                                <Box sx={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                                    <Button
                                        disableElevation
                                        variant="contained"
                                        onClick={handleOpenModal}
                                    >
                                        Dodaj
                                    </Button>
                                    <Button
                                        disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                        disableElevation
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            const permissions = table.getSelectedRowModel().rows.map(row => row.original.code);
                                            handleRemovePermissions(permissions);
                                            table.toggleAllRowsSelected(false);
                                        }}
                                    >
                                        Usun
                                    </Button>
                                </Box>
                            ) : null
                        }
                    />
                </Grid>
            </Grid>
            {
                isOpenModal
                    ? <ModalAddPermission
                        isOpen={isOpenModal}
                        onClose={handleCloseModal}
                        userPermissions={permissions}
                    />
                    : null
            }
        </>

    )
};

export default UserPermissions;