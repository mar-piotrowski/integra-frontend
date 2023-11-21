import React from "react";
import CustomModal from "../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import FormDate from "../../components/form/FormDate";
import FormInput from "../../components/form/FormInput";
import {ModalBaseProps} from "../../interfaces/modal";

interface EmployeeWorkHistoryModalProps extends ModalBaseProps {

}

interface EmployeeSchoolHistoryModal {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
}

const employeeSchoolHistoryDefaultValues: EmployeeSchoolHistoryModal = {
    companyName: "",
    position: "",
    startDate: "",
    endDate: ""
};

const EmployeeWorkHistoryModal = ({open, onClose}: EmployeeWorkHistoryModalProps) => {
    const {handleSubmit, reset, control} = useForm<EmployeeSchoolHistoryModal>({
        defaultValues: employeeSchoolHistoryDefaultValues
    });

    const onSubmitHandler: SubmitHandler<EmployeeSchoolHistoryModal> = (data) => {
        console.log(data)
    }

    const onCloseModal = () => {
        onClose();
        reset();
    }

    return (
        <CustomModal
            open={open}
            onClose={onCloseModal}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant={"h3"}>Dodawanie historii zatrudnienia</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"companyName"} label={"Nazwa firmy"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"position"} label={"Stanowisko"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Data rozpoczęcia"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"endDate"} label={"Data zakończenia"} control={control}/>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid
                    item
                    container
                    spacing={2}
                    xs={12}
                    justifyContent={"flex-end"}
                >
                    <Grid item>
                        <Button variant="contained" color="error" onClick={onCloseModal}>
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
}

export default EmployeeWorkHistoryModal;