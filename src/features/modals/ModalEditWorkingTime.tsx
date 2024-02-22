import {EditWorkingTimeDto, WorkingTimeDto} from "../../api/types/workingTimeTypes";
import React, {useEffect} from "react";
import CustomModal from "../../components/CustomModal";
import {Button, Grid} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import Header from "../../components/CustomModalHeader";
import FormDateTime from "../../components/Form/FormDateTime";
import useEditWorkingTime from "../../hooks/workingTime/useEditWorkingTime";
import {useParams} from "react-router-dom";

interface ModalEditWorkingTimeProps {
    isOpen: boolean;
    onClose: () => void;
    workingTime: WorkingTimeDto;
}

const ModalEditWorkingTime = ({isOpen, onClose, workingTime}: ModalEditWorkingTimeProps) => {
    const {userId} = useParams();
    const {mutate, isSuccess} = useEditWorkingTime(parseInt(userId!));
    const {control, handleSubmit, setValue} = useForm<EditWorkingTimeDto>({defaultValues: workingTime});

    useEffect(() => {
        if (isSuccess)
            onClose();
    }, [isSuccess]);

    const onSubmitHandler: SubmitHandler<EditWorkingTimeDto> = (data) => {
        mutate(data);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Header title={"Edycja czasu pracy"}/>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormDateTime name={"startDate"} label={"Rozpoczęcie"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormDateTime name={"endDate"} label={"Zakończenie"} control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => setValue("endDate", null)}>Usuń zakończenie zmiany</Button>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"} spacing={1} xs={12}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={onClose}> Anuluj </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" type="submit"> Edytuj </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    );
};

export default ModalEditWorkingTime;