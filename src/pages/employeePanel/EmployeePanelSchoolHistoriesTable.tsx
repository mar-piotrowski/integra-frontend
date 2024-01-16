import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { toDateString } from "../../utils/dateHelper";
import { SchoolHistoryDto } from "../../api/types/documentTypes";
import { schoolDegreeMapper } from "../../constants/mappers";
import CustomTable from "../../components/CustomTable";
import React from "react";
import useGetSchoolHistories from "../../hooks/schoolHistory/useGetSchoolHistories";
import { useParams } from "react-router-dom";

const EmployeePanelSchoolHistoriesTable = () => {
    const { userId } = useParams();
    const { data: schoolHistories } = useGetSchoolHistories(parseInt(userId!));

    const columns = useMemo<MRT_ColumnDef<SchoolHistoryDto>[]>(
        () => [
            {
                accessorKey: "schoolName",
                header: "Szkoła"
            },
            {
                accessorKey: "degree",
                header: "Stopień",
                Cell: ({ row }) => <div>{schoolDegreeMapper(row.original.degree)}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{toDateString(row.original.endDate)}</div>
            },
        ],
        []
    );
    return (
        <CustomTable
            columns={columns}
            data={schoolHistories ?? []}
        />
    );
}

export default EmployeePanelSchoolHistoriesTable;