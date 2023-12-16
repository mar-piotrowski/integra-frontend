import {Grid, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import {Box} from "@mui/system";
import React, {useMemo} from "react";
import CustomTable from "../components/CustomTable";
import ShowAmount from "../components/ShowAmount";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {MRT_ColumnDef} from "material-react-table";
import {UserDto} from "../api/types/userTypes";

const Holidays = () => {
    const columns = useMemo<MRT_ColumnDef<UserDto>[]>(
        () => [
            {
                accessorKey: "firstname",
                header: "First Name",
                size: 150,
            },
            {
                accessorKey: "lastname",
                header: "Last Name",
                size: 150,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 200,
            },
        ],
        []
    );

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Oczekujące" value={100} color="blue"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Zaakceptowane" value={100} color="green"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Odrzucone" value={100} color="red"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomTable
                            columns={columns}
                            data={[]}
                            enableSelectAll
                            renderRowActionMenuItems={() => [
                                <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                    <ListItemIcon>
                                        <TaskAltOutlinedIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Zaakceptuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Odrzuć</ListItemText>
                                </MenuItem>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Holidays;
