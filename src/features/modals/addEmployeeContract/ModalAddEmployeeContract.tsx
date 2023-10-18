import {Button, Grid, Tab, Typography} from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import {ModalBaseProps} from "../../../interfaces/modal";
import React, {SyntheticEvent, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Box} from "@mui/system";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ModalAddEmployeeContractBaseInfo from "./components/ModalAddEmployeeContractBaseInfo";
import ModalAddEmployeeContractInsurance from "./components/ModalAddEmployeeContractInsurance";
import ModalAddEmployeeContractTax from "./components/ModalAddEmployeeContractTax";

interface ModalAddEmployeeContract extends ModalBaseProps {
}

export interface AddEmployeeContractForm {
    userId: number;
    salary: number;
    type: string;
    workingTimeType: string;
    startDate: string;
    endDate: string;
    signOnDate: string;
    jobFound: boolean;
    fgsp: boolean;
    exemptionPit: boolean;
    companyId: number;
    employmentDocumentType: number;
    employmentWorkingType: number;
    jobPosition: number;
    locationId: number;
    insuranceCode: number;
    taxReliefId: number;
    deductibleCostId: number
    taxThresholdId: number;
    workingTimeValue1: number;
    workingTimeValue2: number;
    salaryInterval: number;
}

const addEmployeeContractDefaultValues: AddEmployeeContractForm = {
    userId: 0,
    salary: 0,
    type: "",
    workingTimeType: "",
    startDate: "",
    endDate: "",
    signOnDate: "",
    jobFound: true,
    fgsp: false,
    exemptionPit: false,
    companyId: 0,
    employmentDocumentType: 0,
    employmentWorkingType: 0,
    jobPosition: 0,
    locationId: 0,
    insuranceCode: 0,
    taxReliefId: 0,
    deductibleCostId: 0,
    taxThresholdId: 0,
    workingTimeValue1: 0,
    workingTimeValue2: 0,
    salaryInterval: 0
}

const ModalAddEmployeeContract = ({open, onClose}: ModalAddEmployeeContract) => {
    const {control, reset, handleSubmit} = useForm<AddEmployeeContractForm>({
        defaultValues: addEmployeeContractDefaultValues
    });

    const [value, setValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<AddEmployeeContractForm> = (data) => {
        console.log(data);
    };

    const onCloseHandler = () => {
       onClose();
       reset();
    }

    return (
        <CustomModal open={open} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Dodawanie umowy pracownika</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Podstawowe informacje" value="1"/>
                                    <Tab label="Ubezpieczenie" value="2"/>
                                    <Tab label="Podatki" value="3"/>
                                </TabList>
                            </Box>
                            <TabPanel value={"1"}>
                                <ModalAddEmployeeContractBaseInfo control={control}/>
                            </TabPanel>
                            <TabPanel value={"2"}>
                                <ModalAddEmployeeContractInsurance control={control}/>
                            </TabPanel>
                            <TabPanel value={"3"}>
                               <ModalAddEmployeeContractTax control={control} />
                            </TabPanel>
                        </TabContext>
                        <Grid
                            item
                            container
                            justifyContent={"flex-end"}
                            spacing={1}
                            xs={12}
                        >
                            <Grid item>
                                <Button variant="contained" color="error" onClick={onCloseHandler}>
                                    Anuluj
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Dodaj
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalAddEmployeeContract;