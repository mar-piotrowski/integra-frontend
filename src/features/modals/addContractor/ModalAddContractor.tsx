import CustomModal from "../../../components/CustomModal";
import React, {SyntheticEvent, useState} from "react";
import {ModalBaseProps} from "../../../interfaces/modal";
import {Box, Button, Grid, Tab, Typography} from "@mui/material";
import {BankDetails, Localization} from "../../../constants/models";
import {SubmitHandler, useForm} from "react-hook-form";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ModalAddContractorBaseInfo from "./components/ModalAddContractorBaseInfo";
import ModalAddContractorLocation from "./components/ModalAddContractorLocation";
import ModalAddContractorPayment from "./components/ModalAddContractorPayment";


interface ModalAddContractorProps extends ModalBaseProps {
}

export interface ContractorForm {
    fullName: string;
    shortName: string;
    location: Localization;
    nip: string;
    phone: string;
    email: string;
    representative: string;
    bankDetails: BankDetails;
}

const defaultValues: ContractorForm = {
    fullName: "",
    shortName: "",
    nip: "",
    representative: "",
    phone: "",
    email: "",
    bankDetails: {
        name: "",
        number: ""
    },
    location: {
        street: "",
        houseNo: "",
        apartmentNo: "",
        postalCode: "",
        city: "",
        country: "",
        commune: "",
        district: "",
        province: "",
        isPrivate: true,
        isCompany: false,
    },
}

const ModalAddContractor = ({open, onClose}: ModalAddContractorProps) => {
    const [value, setValue] = useState("1");
    const {control, handleSubmit, reset} = useForm<ContractorForm>({
        defaultValues
    })

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<ContractorForm> = (data) => {
        console.log(data);
    };

    const onCloseExtended = () => {
        onClose();
        reset();
    }

    return (
        <CustomModal
            open={open}
            onClose={onCloseExtended}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nowego kontrahenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList onChange={handleChange}>
                                    <Tab label="podstawowe" value="1"/>
                                    <Tab label="lokalizacja" value="2"/>
                                    <Tab label="rozliczenia" value="3"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ModalAddContractorBaseInfo control={control}/>
                            </TabPanel>
                            <TabPanel value="2">
                                <ModalAddContractorLocation control={control}/>
                            </TabPanel>
                            <TabPanel value="3">
                                <ModalAddContractorPayment control={control}/>
                            </TabPanel>
                        </TabContext>
                    </form>
                </Grid>
                <Grid item container justifyContent={"flex-end"} spacing={2}>
                   <Grid item>
                       <Button variant="contained" color="error" onClick={onClose}>
                           Anuluj
                       </Button>
                   </Grid>
                    <Grid item>

                        <Button variant="contained" type="submit">
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </CustomModal>
    )
};

export default ModalAddContractor;