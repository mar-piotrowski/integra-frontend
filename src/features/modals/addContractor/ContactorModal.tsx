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
import { CreateContractorRequest } from "../../../api/types/contractorTypes";
import { UpdateContractor } from "../../../pages/manegementPanel/Contractors";

interface ModalAddContractorProps extends ModalBaseProps {
    contractorUpdate?: UpdateContractor | null;
}

const defaultValues: CreateContractorRequest = {
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
        isPrivate: false,
        isCompany: true,
    },
}

const ContactorModal = ({ open, onClose, contractorUpdate }: ModalAddContractorProps) => {
    const [value, setValue] = useState("1");
    const { control, handleSubmit, reset } = useForm<CreateContractorRequest>({ defaultValues })
    const { mutate: createContractorMutate, isSuccess } = useCreateContractor();
    const { mutate: contractorUpdateMutation } = useUpdateContractor();

    useEffect(() => {
        console.log(contractorUpdate)
        if (contractorUpdate != null)
            reset(contractorUpdate.contractor);
        if (!isSuccess) return;
        onClose();
        reset();
    }, [reset, contractorUpdate, isSuccess, onClose]);

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<CreateContractorRequest> = (contractor: CreateContractorRequest) => {
        if (contractorUpdate != undefined)
            contractorUpdateMutation({ contractorId: contractorUpdate.id, contractor });
        else
            createContractorMutate(contractor);
    };

    const onCloseExtended = () => {
        onClose();
        reset();
        setValue("1");
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
                                <ModalAddContractorBaseInfo control={control} />
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

export default ContactorModal;