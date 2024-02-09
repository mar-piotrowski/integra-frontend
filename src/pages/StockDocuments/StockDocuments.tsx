import {Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import React, {useMemo, useState} from "react";
import ButtonDropdown, {ButtonDropdownItem} from "../../components/Buttons/ButtonDropdown";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useDocuments from "../../hooks/documents/useDocuments";
import {toDateString} from "../../utils/dateHelper";
import {DocumentDetails, DocumentType} from "../../api/types/documentTypes";
import {Box} from "@mui/system";
import {errorToast} from "../../utils/toastUtil";
import {useBoolean} from "../../hooks/useBoolean";
import ModalDocumentDetails from "../../features/document/ModalDocumentDetails";
import {useNavigate} from "react-router-dom";

const documentMenuItems: ButtonDropdownItem[] = [
    {
        label: "Wydanie zewnetrzne",
        to: "/management-panel/document-wz"
    },
    {
        label: "Przyjęcie zewnętrzne",
        to: "/management-panel/document-pz"
    },
    {
        label: "Przeniesienie magazynowe",
        to: "/management-panel/document-mm"
    }
]

const documentTypeMapper = (type: DocumentType) => {
    switch (type) {
        case DocumentType.Invoice:
            return <div>Faktura</div>;
        case DocumentType.Pw:
            return <div>PW</div>;
        case DocumentType.Rw:
            return <div>RW</div>;
        case DocumentType.Pz:
            return <div>PZ</div>;
        case DocumentType.Wz:
            return <div>WZ</div>;
        case DocumentType.Mm:
            return <div>MM</div>;
    }
}

const documentTypeEditLink = (type: number, documentId: number): string => {
    const link = "/management-panel/document";
    switch (type) {
        case DocumentType.Invoice:
            return `${link}-invoice/${documentId}/edit`;
        case DocumentType.Pz:
            return `${link}-pz/${documentId}/edit`;
        case DocumentType.Wz:
            return `${link}-wz/${documentId}/edit`;
        case DocumentType.Mm:
            return `${link}-mm/${documentId}/edit`;
        default:
            return "";
    }
}

const filter: DocumentType[] = [DocumentType.Mm, DocumentType.Pz, DocumentType.Wz, DocumentType.Rw];

const StockDocuments = () => {
    const navigate = useNavigate();
    const {data: documents} = useDocuments(filter, "stockDocuments");
    const [document, setDocument] = useState<DocumentDetails | null>(null);
    const {
        value: documentDetailsModal,
        setTrue: openDocumentDetailsModal,
        setFalse: closeDocumentDetailsModal
    } = useBoolean(false);

    const columns = useMemo<MRT_ColumnDef<DocumentDetails>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer"
            },
            {
                accessorKey: "type",
                header: "Typ",
                Cell: ({row}) => <div>{documentTypeMapper(row.original.type)}</div>
            },
            {
                accessorKey: "issueDate",
                header: "Data wystawienia",
                Cell: ({row}) => <div>{toDateString(row.original.issueDate)}</div>
            },
            {
                accessorKey: "totalAmountWithTax",
                header: "Suma brutto",
                Cell: ({row}) => <div>{row.original.totalAmountWithTax} zł</div>
            },
            {
                accessorKey: "totalAmountWithoutTax",
                header: "Suma netto",
                Cell: ({row}) => <div>{row.original.totalAmountWithoutTax} zł</div>
            },
            {
                accessorKey: "locked",
                header: "Zatwierdzona",
                Cell: ({row}) => row.original.locked
                    ? <Box color={"green"}>Tak</Box>
                    : <Box color={"red"}>Nie</Box>
            },
        ],
        []
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item container spacing={2}>
                    <Grid item>
                        <ButtonDropdown label={"Wystaw dokument"} items={documentMenuItems}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={documents ?? []}
                        enableRowActions
                        muiTableBodyRowProps={({row}) => ({
                            onClick: () => {
                                setDocument(row.original);
                                openDocumentDetailsModal();
                            },
                            sx: {cursor: "pointer"}
                        })}
                        renderRowActionMenuItems={({row, closeMenu}) => [
                            <MenuItem key="edit" onClick={() => {
                                closeMenu();
                                if (row.original.locked) {
                                    errorToast("Dokument został zatwierdzony")
                                    return;
                                }
                                setDocument(row.original);
                                const redirectLink = documentTypeEditLink(row.original.type, row.original.id);
                                if (redirectLink == "") {
                                    errorToast("Coś poszło nie tak");
                                    return;
                                }
                                navigate(redirectLink);
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                closeMenu();
                                if (row.original.locked) {
                                    errorToast("Dokument został zatwierdzony")
                                    return;
                                }
                                setDocument(row.original);
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
                documentDetailsModal
                    ? <ModalDocumentDetails
                        isOpen={documentDetailsModal}
                        onClose={closeDocumentDetailsModal}
                        document={document!}
                    />
                    : null
            }
        </>
    );
};

export default StockDocuments;