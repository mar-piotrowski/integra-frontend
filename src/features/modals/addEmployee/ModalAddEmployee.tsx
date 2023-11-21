import {Button, Grid, Tab} from "@mui/material";
import {Box} from "@mui/system";
import React, {SyntheticEvent} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ModalAddEmployeeBasicInfo from "./components/ModalAddEmployeeBasicInfo";
import ModalAddEmployeeAddress from "./components/ModalAddEmployeeAddress";
import ModalAddEmployeeDetails from "./components/ModalAddEmployeeDetails";
import ModalAddEmployeeBank from "./components/ModalAddEmployeeBank";
import {BankDetails, Gender, Localization} from "../../../constants/models";
import CustomModal from "../../../components/CustomModal";
import {z} from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface ModalAddEmployeeProps {
    open: boolean;
    onClose: () => void;
}

export interface EmployeeForm {
    firstname: string;
    lastname: string;
    secondName: string;
    motherName: string;
    fatherName: string;
    motherLastname: string;
    fatherLastname: string;
    birthday: string;
    birthPlace: string;
    pesel: string;
    sex: Gender;
    email: string;
    idCardNo: string;
    phoneNo: string;
    citizenship: string;
    nip: string;
    location: Localization;
    bank: BankDetails;
}

const employeeFormDefaultValues: EmployeeForm = {
    firstname: "",
    lastname: "",
    secondName: "",
    motherName: "",
    fatherName: "",
    motherLastname: "",
    fatherLastname: "",
    birthday: "",
    birthPlace: "",
    pesel: "",
    sex: Gender.None,
    email: "",
    idCardNo: "",
    phoneNo: "",
    citizenship: "",
    nip: "",
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
    bank: {
        name: "",
        number: "",
    },
};

const schema = z.object({
    firstname: z.string().min(1, "Pole jest wymagane"),
    lastname: z.string().min(1, "Pole jest wymagane"),
    pesel: z.string()
            .length(11, "Pesel musi zawierać 11 cyfr")
            .regex(/^[0-9]/, "Podano błędny pesel"),
    email: z.string().email("Podano błędy adres email"),
    phone: z.string().min(1, "Pole jest wymagane"),
    birthPlace: z.string().min(1, "Pole jest wymagane"),
    birthday: z.string().min(1, "Pole jest wymagane"),
    citizenship: z.string().min(1, "Pole jest wymagane"),
    gender: z.number().min(1, "Wymagane jest wybranie płci"),
    location: z.object({
        city: z.string().min(1, "Pole jest wymagane"),
        street: z.string().min(1, "Pole jest wymagane"),
        houseNo: z.string().min(1, "Pole jest wymagane"),
        apartmentNo: z.string().min(1, "Pole jest wymagane"),
        country: z.string().min(1, "Pole jest wymagane")
    })
})

const ModalAddEmployee = ({open, onClose}: ModalAddEmployeeProps) => {
    const [value, setValue] = React.useState("1");
    const {control, handleSubmit} = useForm<EmployeeForm>({
        defaultValues: employeeFormDefaultValues,
        resolver: zodResolver(schema)
    });

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<EmployeeForm> = (data) => {
        console.log(data);
    };

    return (
        <CustomModal open={open} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <TabList onChange={handleChange}>
                            <Tab label="podstawowe" value="1"/>
                            <Tab label="adresowe" value="2"/>
                            <Tab label="szczegółowe" value="3"/>
                            <Tab label="rozliczeniowe" value="4"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ModalAddEmployeeBasicInfo control={control}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <ModalAddEmployeeAddress control={control}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <ModalAddEmployeeDetails control={control}/>
                    </TabPanel>
                    <TabPanel value="4">
                        <ModalAddEmployeeBank control={control}/>
                    </TabPanel>
                </TabContext>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                    }}
                >
                    <Button variant="contained" color="error" onClick={onClose}>
                        Anuluj
                    </Button>
                    <Button variant="contained" type="submit">
                        Dodaj
                    </Button>
                </Grid>
            </form>
        </CustomModal>
    );
};

export default ModalAddEmployee;
