import React, {useEffect} from "react";
import CustomModal from "../../components/CustomModal";
import {ModalBaseProps} from "../../interfaces/modal";
import {Button, Grid, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormDate from "../../components/form/FormDate";
import FormSelect, {FormSelectOption} from "../../components/form/FormSelect";
import {SchoolHistory, SchoolHistoryDto} from "../../api/types/documentTypes";
import useCreateSchoolHistory from "../../hooks/schoolHistory/useCreateSchoolHistory";
import useUpdateSchoolHistory from "../../hooks/schoolHistory/useUpdateSchoolHistory";

interface EmployeeSchoolHistoryModalProps extends ModalBaseProps {
    schoolHistory?: SchoolHistoryDto | null;
}

const employeeSchoolHistoryDefaultValues: SchoolHistory = {
    schoolName: "",
    startDate: "",
    endDate: "",
    title: "",
    degree: 0,
    specialization: "",
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

const EmployeeSchoolHistoryModal = ({open, onClose, schoolHistory}: EmployeeSchoolHistoryModalProps) => {
    const {mutate: createSchoolHistoryMutation, isSuccess: createSuccess, reset: createReset} = useCreateSchoolHistory();
    const {mutate: updateSchoolHistoryMutation, isSuccess: updateSuccess, reset: updateReset} = useUpdateSchoolHistory();
    const {handleSubmit, reset, control} = useForm<SchoolHistory>({defaultValues: employeeSchoolHistoryDefaultValues});

    useEffect(() => {
        if (schoolHistory != null)
            reset({...schoolHistory})
        if (createSuccess || updateSuccess) {
            updateReset();
            createReset();
            onCloseModal();
        }
    }, [createSuccess, updateSuccess, schoolHistory]);


    const onSubmitHandler: SubmitHandler<SchoolHistory> = (data: SchoolHistory) => {
        if (schoolHistory != null) {
            updateSchoolHistoryMutation({
                schoolHistoryId: schoolHistory.id,
                schoolHistory: {...data}
            })
            return;
        }
        createSchoolHistoryMutation({
            userId: 2,
            ...data
        });
    }

    const onCloseModal = () => {
        onClose();
        reset(employeeSchoolHistoryDefaultValues);
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
                                    name={"degree"}
                                    label={"Wykształcenie"}
                                    control={control}
                                    options={schoolLevelOptions}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"specialization"} label={"Specjalizacja"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"title"} label={"Tytuł"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Data rozpoczęcia"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"endDate"} label={"Data zakończenias"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                        {schoolHistory != null ? "Edytuj" : "Dodaj"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </Grid>
        </CustomModal>
    )
}

export default EmployeeSchoolHistoryModal;