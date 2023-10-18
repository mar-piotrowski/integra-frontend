import MaterialReactTable, {
    MRT_ColumnDef,
    MaterialReactTableProps,
} from "material-react-table";
import {MRT_Localization_PL} from "material-react-table/locales/pl";
import React from "react";

interface CustomTableProps<T extends Record<string, any> ={}>
    extends MaterialReactTableProps<T> {
    data: T[];
    columns: MRT_ColumnDef<T>[];
}

const CustomTable = <T extends Record<string, any>>({
                                                        ...props
                                                    }: CustomTableProps<T>) => {
    return (
        <MaterialReactTable
            {...props}
            enableGlobalFilterModes
            initialState={{
                showGlobalFilter: true,
            }}
            enableClickToCopy
            positionGlobalFilter="left"
            enableStickyHeader
            localization={MRT_Localization_PL}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableRowActions
            positionActionsColumn="last"
            muiSearchTextFieldProps={{
                sx: {
                    "&.MuiFormControl-root .MuiInput-root": {
                        borderRadius: "10px",
                        "&:after": {
                            border: "none !important",
                        },
                        "&:before": {
                            border: "none !important",
                        },
                    },
                },
            }}
            muiTableHeadRowProps={{
                sx: {
                    boxShadow: "none",
                },
            }}
            muiTopToolbarProps={{
                sx: {
                    "&.MuiToolbar-root, .MuiCollapse-root": {
                        borderRadius: "10px",
                        overflow: "hidden",
                    },
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    border: "none",
                },
            }}
            muiBottomToolbarProps={{
                sx: {
                    border: "none",
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    border: "none",
                },
            }}
            muiTablePaperProps={{
                elevation: 0,
                sx: {
                    padding: "10px",
                    borderRadius: 4,
                    overflow: "hidden",
                },
            }}
        />
    );
};

export default CustomTable;
