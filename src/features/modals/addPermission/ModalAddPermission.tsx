import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal"
import { Button, Grid, List, Typography } from "@mui/material";
import useGetPermissions from "../../../hooks/permissions/useGetPermissions";
import PermissionListItem from "./components/PermissionListItem";
import useAddUserPermissions from "../../../hooks/employee/useAddUserPemissions";
import { useParams } from "react-router-dom";
import { Permission } from "../../../api/types/permissionTypes";

interface ModalAddPermissionProps {
    isOpen: boolean;
    onClose: () => void;
    userPermissions: Permission[];
}

const ModalAddPermission = ({ isOpen, onClose, userPermissions }: ModalAddPermissionProps) => {
    const { userId } = useParams();
    const { data: permissions } = useGetPermissions();
    const { mutate: addPermissionsMutate, isSuccess: addPermissionSuccess } = useAddUserPermissions();
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    useEffect(() => {
        if (addPermissionSuccess)
            onClose();
    }, [addPermissionSuccess])

    const handleToggleSelectPermission = (permissionCode: number) => {
        var codeIndex = selectedPermissions.findIndex(permission => permission == permissionCode);
        if (codeIndex == -1) {
            setSelectedPermissions(prev => ([...prev, permissionCode]))
            return;
        }
        setSelectedPermissions(selectedPermissions.filter((_, index) => index != codeIndex))
    }

    const handleAddPermissions = () => {
        addPermissionsMutate({
            userId: parseInt(userId!),
            permissions: selectedPermissions
        });
    }

    const renderedPermissions = permissions?.map((permission: Permission) => (
        userPermissions.findIndex(userPermission => userPermission.code == permission.code) == -1
            ?
            <PermissionListItem
                title={permission.name}
                value={permission.code}
                onToggle={handleToggleSelectPermission}
            />
            : null
    ));

    if (renderedPermissions == undefined)
        return (
            <CustomModal isOpen={isOpen} onClose={onClose}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h3" mb={2}>Dodawanie uprawnień</Typography>
                    </Grid>
                    <Grid item xs={12} my={5}>
                        <Typography textAlign="center" variant="body1">Brak uprawnien do przyznania</Typography>
                    </Grid>
                    <Grid item spacing={2} xs={12} display={"flex"} justifyContent={"flex-end"}>
                        <Button variant="contained" color="error" onClick={onClose}>Wyjdź</Button>
                    </Grid>
                </Grid>
            </CustomModal >
        );

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Typography variant="h3" mb={2}>Dodawanie uprawnień</Typography>
            <Grid container>
                <Grid item xs={12} maxHeight={"400px"} sx={{ overflowY: "auto" }}>
                    <List>
                        {renderedPermissions}
                    </List>
                </Grid>
                <Grid item container spacing={2} xs={12} display={"flex"} justifyContent={"flex-end"}>
                    <Grid item>
                        <Button variant="contained" color="error" onClick={onClose}>Wyjdź</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleAddPermissions}>Dodaj uprawnienia</Button>
                    </Grid>
                </Grid>
            </Grid>
        </CustomModal >
    )
}

export default ModalAddPermission;