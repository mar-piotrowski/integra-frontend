import React from "react";
import CustomModal from "../../components/CustomModal";
import {ModalBaseProps} from "../../interfaces/modal";
import {Button, Grid, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormDate from "../../components/form/FormDate";
import FormSelect, {FormSelectOption} from "../../components/form/FormSelect";

interface EmployeeSchoolHistoryModalProps extends ModalBaseProps {

}

interface EmployeeSchoolHistory {
    schoolName: string;
    startDate: string;
    endDate: string;
    level: number;
    specialisation: string;
    academicTitle: string;
}

const employeeSchoolHistoryDefaultValues: EmployeeSchoolHistory = {
    schoolName: "",
    startDate: "",
    endDate: "",
    level: 0,
    academicTitle: "",
    specialisation: "",
}

const schoolLevelOptions: FormSelectOption[] = [
    {
        label: "podstawowe",
        value: 0
    },
    {
        label: "zadowowe",
        value: 1
    },
    {
        label: "policealne",
        value: 2
    },
    {
        label: "wyższe",
        value: 3
    }
]

const EmployeeSchoolHistoryModal = ({open, onClose}: EmployeeSchoolHistoryModalProps) => {
    const {handleSubmit, reset, control} = useForm<EmployeeSchoolHistory>({
        defaultValues: employeeSchoolHistoryDefaultValues
    });

    const onSubmitHandler: SubmitHandler<EmployeeSchoolHistory> = (data) => {
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
                <Grid item xs={12}>
                    <Typography variant={"h3"}>Dodawanie historii wykształcenia</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput name={"schoolName"} label={"Nazwa szkoły"} control={control}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect
                                    name={"level"}
                                    label={"Wykształcenie"}
                                    control={control}
                                    options={schoolLevelOptions}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"specialisation"} label={"Specjalizacja"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                               <FormInput name={"academicTitle"} label={"Tytuł"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Data rozpoczęcia"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"endDate"} label={"Data zakończenias"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
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

export default EmployeeSchoolHistoryModal;