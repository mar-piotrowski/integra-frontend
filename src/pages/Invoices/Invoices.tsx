import {Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import React, {useMemo, useState} from "react";
import CustomTable from "../../components/CustomTable";
import ButtonDropdown, {ButtonDropdownItem} from "../../components/Buttons/ButtonDropdown";
import {MRT_ColumnDef} from "material-react-table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {DocumentDetails, DocumentType} from "../../api/types/documentTypes";
import useDocuments from "../../hooks/documents/useDocuments";
import {useNavigate} from "react-router-dom";
import {useBoolean} from "../../hooks/useBoolean";
import ModalDocumentDetails from "../../features/document/ModalDocumentDetails";
import { errorToast } from "../../utils/toastUtil";
import { toDateString } from "../../utils/dateHelper";

export const defaultValues: DocumentDetails = {
    type: DocumentType.Unknown,
    number: "",
    issueDate: "",
    admissionDate: null,
    receptionDate: null,
    paymentDate: null,
    contractor: null,
    discount: 0,
    totalAmountWithTax: 0,
    totalAmountWithoutTax: 0,
    paid: false,
    locked: false,
    paymentMethod: 0,
    sourceStockId: null,
    targetStockId: null,
    articles: [],
    id: 0
}

const filter: DocumentType[] = [DocumentType.Invoice];

const Invoices = () => {
    const navigate = useNavigate();
    const {data: invoices} = useDocuments(filter, "invoices");
    const [document, setDocument] = useState<DocumentDetails | null>(null);
    const {
        value: documentDetailsModal,
        setTrue: openDocumentDetailsModal,
        setFalse: closeDocumentDetailsModal
    } = useBoolean(false);

    const createInvoiceTypes = useMemo<ButtonDropdownItem[]>(
        () => [
            {
                label: "Sprzedaży",
                to: "/management-panel/document-invoice"
            }
        ],
        []
    );

    const columns = useMemo<MRT_ColumnDef<DocumentDetails>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer"
            },
            {
                accessorKey: "contractor.fullName",
                header: "Kontrahent"
            },
            {
                accessorKey: "issueDate",
                header: "Data wystawienia",
                Cell: ({row}) => <div>{toDateString(row.original.issueDate)}</div>
            },
        ],
        []
    );

    return (
        <>
            <Grid sx={{flexGrow: 1}} container spacing={2}>
                <Grid item xs={12}>
                    <ButtonDropdown label={"Wystaw fakture"} items={createInvoiceTypes}/>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={invoices ?? []}
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
                                navigate(`/management-panel/document-invoice/${row.original.id}/edit`);
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
    )
}

export default Invoices;