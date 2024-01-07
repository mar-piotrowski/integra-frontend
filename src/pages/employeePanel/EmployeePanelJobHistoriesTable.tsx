
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import { toDateString } from "../../utils/dateHelper";
import { JobHistoryDto } from "../../api/types/documentTypes";
import useAuth from "../../hooks/auth/useAuth";
import CustomTable from "../../components/CustomTable";
import useGetJobHistories from "../../hooks/workHistory/useGetJobHistories";

const EmployeePanelJobHistoriesTable = () => {
    const { auth } = useAuth();
    const { data: jobHistories } = useGetJobHistories(auth?.userId);
    const columns = useMemo<MRT_ColumnDef<JobHistoryDto>[]>(
        () => [
            {
                accessorKey: "companyName",
                header: "Firma",
            },
            {
                accessorKey: "position",
                header: "Stanowisko"
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
            }
        ],
        []
    );

    return (
        <CustomTable
            columns={columns}
            data={jobHistories?.data ?? []}
        />
    );
};

export default EmployeePanelJobHistoriesTable;