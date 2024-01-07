import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import React from "react";
import { ContractDto } from "../../../../api/types/documentTypes";
import Description from "../../../../components/Description";
import { toDateString } from "../../../../utils/dateHelper";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ContractDetailsBaseProps {
    contract: ContractDto
}

const convertBoolToString = (value: boolean) => value ? "Tak" : "Nie";

const ContractDetailsBase = ({ contract }: ContractDetailsBaseProps) => {
    return (
        <Grid container spacing={1}>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Status" value={"Aktywny"} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Pracownik" value={`${contract.user.firstname} ${contract.user.lastname}`} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Stanowisko" value={contract.jobPositionName} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Wynagrodzenie brutto" value={contract.salaryWithTax} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Wynagrodzenie netto" value={contract.salaryWithoutTax} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Data podpisania" value={
                    contract.signedOnDate != null
                        ? toDateString(contract.signedOnDate)
                        : "Brak"

                } />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Data rozpoczęcia" value={toDateString(contract.startDate)} />
            </Grid>
            <Grid item sm={12} md={3}>
                <Description variant="column" title="Data zakończenia" value={
                    contract.endDate != null
                        ? toDateString(contract.endDate)
                        : "Brak"
                } />
            </Grid>
            <Grid item container xs={12} spacing={1} mt={4}>
                <Grid item xs={12}>
                    <Accordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                background: "#eef2f6",
                                borderRadius: "8px"
                            }}
                        >
                            <Typography variant="subtitle1">Podatki</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ background: "#f8fafc" }}>
                            <Grid container>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="Koszt uzyskania przychodu" value={contract.deductibleCost} />
                                </Grid>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="Składka dobrowolna" value={convertBoolToString(contract.voluntaryContribution)} />
                                </Grid>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="Fundusz pracy" value={convertBoolToString(contract.jobFund)} />
                                </Grid>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="FGSP" value={convertBoolToString(contract.fgsp)} />
                                </Grid>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="Fundusz emerytalny" value={convertBoolToString(contract.pensionFund)} />
                                </Grid>
                                <Grid item sm={12} md={3}>
                                    <Description variant="column" title="Fundusz rentowny" value={convertBoolToString(contract.profitableFund)} />
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
                            <Typography variant="subtitle1">Ubezpieczenie</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ background: "#f8fafc" }}>
                            <Grid item sm={12} md={3}>
                                <Description variant="column" title="Fundusz rentowny" value={convertBoolToString(contract.profitableFund)} />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ContractDetailsBase;