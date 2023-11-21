import {Grid} from "@mui/material";
import React, {useMemo, useState} from "react";
import ButtonDropdown, {ButtonDropdownItem} from "../../components/ButtonDropdown";
import EmployeeSchoolHistoryModal from "../../features/modals/EmployeeSchoolHistoryModal";
import EmployeeWorkHistoryModal from "../../features/modals/EmployeeWorkHistoryModal";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";

interface Document {
    type: number;
    number: string;
}

const EmployeeDocuments = () => {
    const [schoolHistoryModal, setSchoolHistoryModal] = useState<boolean>(false);
    const [workHistoryModal, setWorkHistoryModal] = useState<boolean>(false);

    const openSchoolModal = () => setSchoolHistoryModal(true);
    const closeSchoolModal = () => setSchoolHistoryModal(false);
    const openWorkHistoryModal = () => setWorkHistoryModal(true);
    const closeWorkHistoryModal = () => setWorkHistoryModal(false);

    const employeeDocuments: ButtonDropdownItem[] = [
        {
            label: "Historia zatrudnienia",
            onClick: openWorkHistoryModal
        },
        {
            label: "Historia wykształcenia",
            onClick: openSchoolModal
        }
    ]

    const columns = useMemo<MRT_ColumnDef<Document>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer"
            },
            {
                accessorKey: "type",
                header: "Typ"
            }
        ],
        []
    )

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonDropdown label={"Dodaj dokument"} items={[]}/>
                </Grid>
                <Grid item>
                    <ButtonDropdown label={"Historia pracownika"} items={employeeDocuments}/>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={[]}
                    />
                </Grid>
            </Grid>
            <EmployeeSchoolHistoryModal open={schoolHistoryModal} onClose={closeSchoolModal}/>
            <EmployeeWorkHistoryModal open={workHistoryModal} onClose={closeWorkHistoryModal}/>
        </>
    )
}

export default EmployeeDocuments;