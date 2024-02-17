import CustomModal from "../../../components/CustomModal";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { ModalBaseProps } from "../../../interfaces/modal";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ModalAddContractorBaseInfo from "./components/ModalAddContractorBaseInfo";
import ModalAddContractorLocation from "./components/ModalAddContractorLocation";
import ModalAddContractorPayment from "./components/ModalAddContractorPayment";
import useCreateContractor from "../../../hooks/contractor/useCreateContractor";
import useUpdateContractor from "../../../hooks/contractor/useUpdateContractor";
import { ContractorDto, CreateContractorRequest } from "../../../api/types/contractorTypes";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalAddContractorProps extends ModalBaseProps {
    contractorUpdate?: ContractorDto | null;
}

const defaultValues: CreateContractorRequest = {
    fullName: "",
    shortName: "",
    email: "",
    phone: "",
    nip: "",
    representative: "",
    bankAccount: {
        name: "",
        number: ""
    },
    location: {
        id: 0,
        street: "",
        houseNo: "",
        apartmentNo: "",
        postalCode: "",
        city: "",
        country: "",
        commune: "",
        district: "",
        province: "",
        isPrivate: false,
        isCompany: true,
    },
}

const validationSchema = z.object({
    fullName: z.string().min(1, "Pole wymagane"),
    shortName: z.string().optional(),
    email: z.string().email("Podano błędny adres email"),
    phone: z.string().min(9, "Podano błedy numer telefonu"),
    nip: z.string().min(10, "Podano błedny nip"),
    representative: z.string().min(1, "Podaj reprezentanta firmy"),
    bankAccount: z.object({
        name: z.string().min(1, "Pole wymagane"),
        number: z.string().min(10, "Podano błedny numer konta"),
    }),
    location: z.object({
        id: z.number(),
        city: z.string().min(1, "Pole jest wymagane"),
        street: z.string().min(1, "Pole jest wymagane"),
        houseNo: z.string().min(1, "Pole jest wymagane"),
        postalCode: z.string().min(1, "Pole jest wymagane"),
        commune: z.string().min(1, "Pole jest wymagane"),
        district: z.string().min(1, "Pole jest wymagane"),
        province: z.string().min(1, "Pole jest wymagane"),
        apartmentNo: z.string().min(1, "Pole jest wymagane"),
        country: z.string().min(1, "Pole jest wymagane")
    })
})

const ModalContractor = ({ open, onClose, contractorUpdate }: ModalAddContractorProps) => {
    const [value, setValue] = useState("1");
    const { control, handleSubmit, reset } = useForm<CreateContractorRequest>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    })
    const { mutate: createContractorMutate, isSuccess: isSuccessCreate, reset: createReset } = useCreateContractor();
    const { mutate: contractorUpdateMutation, isSuccess: isSuccessUpdate, reset: updateReset } = useUpdateContractor();

    useEffect(() => {
        if (isSuccessUpdate || isSuccessCreate)
            onCloseExtended();
    }, [isSuccessCreate, isSuccessUpdate])

    useEffect(() => {
        if (contractorUpdate != null)
            reset(contractorUpdate);
    }, [contractorUpdate]);

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<CreateContractorRequest> = (contractor: CreateContractorRequest) => {
        if (contractorUpdate != undefined)
            contractorUpdateMutation({ contractorId: contractorUpdate.id, contractor });
        else
            createContractorMutate(contractor);
    };

    const onCloseExtended = () => {
        onClose();
        reset(defaultValues);
        setValue("1");
        createReset();
        updateReset()
    }

    return (
        <CustomModal
            isOpen={open}
            onClose={onCloseExtended}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nowego kontrahenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="podstawowe" value="1" />
                                    <Tab label="lokalizacja" value="2" />
                                    <Tab label="rozliczenia" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ModalAddContractorBaseInfo control={control} edit={contractorUpdate != null} />
                            </TabPanel>
                            <TabPanel value="2">
                                <ModalAddContractorLocation control={control} />
                            </TabPanel>
                            <TabPanel value="3">
                                <ModalAddContractorPayment control={control} />
                            </TabPanel>
                        </TabContext>
                        <Grid item container justifyContent={"flex-end"} spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="error" onClick={onCloseExtended}>
                                    Anuluj
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    {contractorUpdate != null ? "Edytuj" : "Dodaj"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
};

export default ModalContractor;