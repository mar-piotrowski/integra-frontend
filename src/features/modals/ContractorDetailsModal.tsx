import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContractorDto } from "../../api/types/contractorTypes";
import CustomModal from "../../components/CustomModal";
import Description from "../../components/Description";

interface ContractorDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contractor: ContractorDto;
}

const ContractorDetailsModal = ({ isOpen, onClose, contractor }: ContractorDetailsModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dane kontrahenta</Typography>
                </Grid>
                <Grid item container spacing={1} xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="Pełna nazwa firmy" value={contractor?.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="Skrócona nazwa firmy" value={contractor?.shortName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="Reprezentant" value={contractor?.representative} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="NIP" value={contractor?.nip} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="Email" value={contractor?.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Description variant="column" title="Phone" value={contractor.phone} />
                    </Grid>
                </Grid >
                <Grid item xs={12}>
                    <Accordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                background: "#eef2f6",
                                borderRadius: "8px"
                            }}
                        >
                            <Typography variant="subtitle1">Lokalizacja</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ background: "#f8fafc" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Państwo" value={contractor.location.country} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Kod pocztowy" value={contractor.location.postalCode} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Miasto" value={contractor.location.city} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Ulica" value={contractor.location.street} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Numer domu" value={contractor.location.apartmentNo} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Numer mieszkania" value={contractor.location.houseNo} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Powiat" value={contractor.location.district} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Gmina" value={contractor.location.commune} variant={"column"} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Description title="Wojewodztwo" value={contractor.location.province} variant={"column"} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                background: "#eef2f6",
                                borderRadius: "8px"
                            }}
                        >
                            <Typography variant="subtitle1">Płatności</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ background: "#f8fafc" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Description title="Nazwa banku" value={contractor.bankAccount?.name} variant="column" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Description title="Numer konta" value={contractor.bankAccount?.number} variant="column" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item container display={"flex"} justifyContent={"flex-end"}>
                    <Grid item>
                        <Button variant={"contained"} color="error" onClick={onClose}>Wyjdź</Button>
                    </Grid>
                </Grid>
            </Grid >
        </CustomModal >
    );
};

export default ContractorDetailsModal;
