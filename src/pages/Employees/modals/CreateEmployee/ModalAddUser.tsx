import {Button, Grid, Tab} from "@mui/material";
import {Box} from "@mui/system";
import React, {SyntheticEvent, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ModalAddEmployeeBasicInfo from "./components/ModalAddEmployeeBasicInfo";
import ModalAddEmployeeAddress from "./components/ModalAddEmployeeAddress";
import ModalAddEmployeeDetails from "./components/ModalAddEmployeeDetails";
import ModalAddEmployeeBank from "./components/ModalAddEmployeeBank";
import CustomModal from "../../../../components/CustomModal";
import {z} from "Zod";
import {CreateUserRequest, UserDto} from "../../../../api/types/userTypes";
import useCreateUser from "../../../../hooks/employee/useCreateEmployee";
import {zodResolver} from "@hookform/resolvers/zod";
import useEditUser from "../../../../hooks/employee/useEditUser";
import ModalAddUserEmployeePanel from "./components/ModalAddUserEmployeePanel";

interface ModalAddEmployeeProps {
    open: boolean;
    onClose: () => void;
    user?: UserDto | null;
}

const employeeFormDefaultValues: CreateUserRequest = {
    id: 0,
    firstname: "",
    lastname: "",
    secondName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    pesel: "",
    sex: 0,
    email: "",
    identityNumber: "",
    phone: "",
    citizenship: "",
    nip: "",
    isStudent: false,
    createAccount: false,
    jobPositionId: 0,
    locations: [{
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
    }],
    bankDetails: {
        name: "",
        number: "",
    },
};

const validationSchema = z.object({
    firstname: z.string().min(1, "Pole jest wymagane"),
    lastname: z.string().min(1, "Pole jest wymagane"),
    pesel: z.string()
        .length(11, "Pesel musi zawierać 11 cyfr")
        .regex(/^[0-9]/, "Podano błędny pesel"),
    email: z.string().email("Podano błędy adres email"),
    phone: z.string().min(1, "Pole jest wymagane"),
    placeOfBirth: z.string().min(1, "Pole jest wymagane"),
    dateOfBirth: z.string().min(1, "Pole jest wymagane"),
    citizenship: z.string().min(1, "Pole jest wymagane"),
    sex: z.number().min(1, "Wymagane jest wybranie płci"),
    location: z.object({
        city: z.string().min(1, "Pole jest wymagane"),
        street: z.string().min(1, "Pole jest wymagane"),
        houseNo: z.string().min(1, "Pole jest wymagane"),
        apartmentNo: z.string().min(1, "Pole jest wymagane"),
        country: z.string().min(1, "Pole jest wymagane")
    })
})

const ModalAddUser = ({open, onClose, user}: ModalAddEmployeeProps) => {
    const {mutate: createUserMutate, isSuccess: createUserSuccess} = useCreateUser();
    const {mutate: editUserMutate, isSuccess: editUserSuccess} = useEditUser();
    const [value, setValue] = React.useState("1");
    const {control, handleSubmit, reset} = useForm<CreateUserRequest>({
        defaultValues: employeeFormDefaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (createUserSuccess || editUserSuccess)
            onClose();
    }, [createUserSuccess, editUserSuccess]);


    useEffect(() => {
        if (user != undefined)
            reset({...user});
    }, []);

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<CreateUserRequest> = (data) => {
        if (user != undefined) {
            editUserMutate(data);
            return;
        }
        createUserMutate(data);
    }

    return (
        <CustomModal isOpen={open} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <TabList onChange={handleChange}>
                            <Tab label="podstawowe" value="1"/>
                            <Tab label="adresowe" value="2"/>
                            <Tab label="szczegółowe" value="3"/>
                            <Tab label="rozliczeniowe" value="4"/>
                            <Tab label="employeeAnywhere" value="5"/>
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
                    <TabPanel value="5">
                        <ModalAddUserEmployeePanel control={control}/>
                    </TabPanel>
                </TabContext>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                    <Button variant="contained" color="error" type="button" onClick={onClose}>
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

export default ModalAddUser;
