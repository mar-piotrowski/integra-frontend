import React, { useEffect } from "react";
import CustomModal from "../../components/CustomModal";
import { ModalBaseProps } from "../../interfaces/modal";
import { Button, Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/Form/FormInput";
import FormDate from "../../components/Form/FormDate";
import FormSelect, { FormSelectOption } from "../../components/Form/FormSelect";
import { SchoolHistory, SchoolHistoryDto } from "../../api/types/documentTypes";
import useCreateSchoolHistory from "../../hooks/schoolHistory/useCreateSchoolHistory";
import useUpdateSchoolHistory from "../../hooks/schoolHistory/useUpdateSchoolHistory";
import useAuth from "../../hooks/auth/useAuth";
import { z } from "Zod";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

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
        value: 1
    },
    {
        label: "zadowowe",
        value: 2
    },
    {
        label: "policealne",
        value: 3
    },
    {
        label: "wyższe",
        value: 4
    }
]

const validationSchema = z.object({
    schoolName: z.string().min(1, "Podaj nazwę szkoły"),
    startDate: z.string().min(1, "Podaj datę rozpoczęcia"),
    endDate: z.string().min(1, "Podaj datę rozpoczęcia"),
    specialization: z.string().optional(),
    title: z.string().optional(),
    degree: z.number().min(1, "Podaj rodzaj wykształcenia")
})

const EmployeeSchoolHistoryModal = ({ open, onClose, schoolHistory }: EmployeeSchoolHistoryModalProps) => {
    const { userId } = useParams();
    const { mutate: createSchoolHistoryMutation, isSuccess: createSuccess, reset: createReset } = useCreateSchoolHistory();
    const { mutate: updateSchoolHistoryMutation, isSuccess: updateSuccess, reset: updateReset } = useUpdateSchoolHistory();
    const { handleSubmit, reset, control } = useForm<SchoolHistory>({
        defaultValues: employeeSchoolHistoryDefaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (schoolHistory != null)
            reset({ ...schoolHistory })
        if (createSuccess || updateSuccess) {
            updateReset();
            createReset();
            onCloseModal();
        }
    }, [createSuccess, updateSuccess, schoolHistory]);


    const onSubmitHandler: SubmitHandler<SchoolHistory> = (data: SchoolHistory) => {
        if (schoolHistory != null) {
            console.log(data);
            updateSchoolHistoryMutation({
                schoolHistoryId: schoolHistory.id,
                schoolHistory: { ...data }
            })
            return;
        }
        createSchoolHistoryMutation({
            userId: parseInt(userId!),
            ...data
        });
    }

    const onCloseModal = () => {
        onClose();
        reset(employeeSchoolHistoryDefaultValues);
    }

    return (
        <CustomModal
            isOpen={open}
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
                                <FormInput name={"schoolName"} label={"Nazwa szkoły"} control={control} />
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
                                <FormInput name={"specialization"} label={"Specjalizacja"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInput name={"title"} label={"Tytuł"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Data rozpoczęcia"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"endDate"} label={"Data zakończenias"} control={control} />
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