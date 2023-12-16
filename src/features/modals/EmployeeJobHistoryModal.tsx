import React, {useEffect} from "react";
import CustomModal from "../../components/CustomModal";
import {Button, Grid, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import FormDate from "../../components/form/FormDate";
import FormInput from "../../components/form/FormInput";
import {ModalBaseProps} from "../../interfaces/modal";
import {JobHistory, JobHistoryDto} from "../../api/types/documentTypes";
import useCreateJobHistory from "../../hooks/workHistory/useCreateJobHistory";
import useUpdateJobHistory from "../../hooks/workHistory/useUpdateJobHistory";

interface EmployeeWorkHistoryModalProps extends ModalBaseProps {
    jobHistory?: JobHistoryDto | null;
}

const employeeSchoolHistoryDefaultValues: JobHistory = {
    companyName: "",
    position: "",
    startDate: "",
    endDate: ""
};

const EmployeeJobHistoryModal = ({open, onClose, jobHistory}: EmployeeWorkHistoryModalProps) => {
    const {mutate: createJobHistoryMutation, isSuccess: createSuccess, reset: createReset} = useCreateJobHistory();
    const {mutate: updateJobHistoryMutation, isSuccess: updateSuccess, reset: updateReset} = useUpdateJobHistory();
    const {handleSubmit, reset, control} = useForm<JobHistory>({
        defaultValues: employeeSchoolHistoryDefaultValues
    });

    useEffect(() => {
        if (jobHistory != null)
            reset(jobHistory);
        if (createSuccess || updateSuccess) {
            updateReset();
            createReset();
            onCloseModal();
        }
    }, [createSuccess, updateSuccess, jobHistory]);

    const onSubmitHandler: SubmitHandler<JobHistory> = (data) => {
        if (jobHistory != null) {
            updateJobHistoryMutation({
                jobHistoryId: jobHistory.id,
                jobHistory: {...data}
            });
            return;
        }
        createJobHistoryMutation({
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
                                        {jobHistory != null ? "Edytuj" : "Dodaj"}
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

export default EmployeeJobHistoryModal;