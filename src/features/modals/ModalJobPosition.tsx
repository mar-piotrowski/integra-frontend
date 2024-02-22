import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/Form/FormInput";
import CustomModal from "../../components/CustomModal";
import useCreateJobPosition from "../../hooks/jobPositions/useCreateJobPosition";
import useEditJobPosition from "../../hooks/jobPositions/useEditJobPosition";

interface JobPositionModalProps {
    jobPositionEdit?: JobPosition;
    isOpen: boolean;
    onClose: () => void;
}

const defaultValues: JobPositionForm = {
    title: ""
};

const ModalJobPosition = ({ isOpen, onClose, jobPositionEdit }: JobPositionModalProps) => {
    const { control, handleSubmit, reset: resetForm } = useForm<JobPositionForm>({ defaultValues })
    const { mutate: createJobPositionMutate, isSuccess: createSuccess } = useCreateJobPosition();
    const { mutate: editJobPositionMutate, isSuccess: editSuccess } = useEditJobPosition()

    useEffect(() => {
        if (createSuccess || editSuccess)
            onCloseExtended();
    }, [createSuccess, editSuccess])

    useEffect(() => {
        if (jobPositionEdit != null)
            resetForm({ ...jobPositionEdit })
    }, [isOpen, jobPositionEdit])

    const handleOnSubmit: SubmitHandler<JobPositionForm> = (data: JobPositionForm) => {
        if (jobPositionEdit == null)
            createJobPositionMutate(data);
        else
            editJobPositionMutate({
                id: jobPositionEdit.id,
                title: data.title
            });
    }

    const onCloseExtended = () => {
        onClose();
        resetForm(defaultValues);
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onCloseExtended}
        >
            <Box mb={2}>
                <Typography variant="h3">{jobPositionEdit != null ? "Edycja" : "Dodawanie"} limity urlopowego</Typography>
            </Box>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <FormInput name="title" label="Nazwa stanowiska" control={control} />
                    </Grid>
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
                            {jobPositionEdit != null ? "Edytuj" : "Dodaj"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CustomModal >
    );
};

export default ModalJobPosition;