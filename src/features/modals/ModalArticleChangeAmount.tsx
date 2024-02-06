import React, { useEffect } from "react";
import { ArticleDto } from "../../api/types/articleTypes";
import CustomModal from "../../components/CustomModal";
import { ModalBaseProps } from "../../interfaces/modal";
import { Button, Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/Form/FormInput";
import useChangeArticleAmount from "../../hooks/article/useChangeArticleAmount";

interface ModalArticleChangeAmountProps extends ModalBaseProps {
    article: ArticleDto;
}

interface ChangeArticleAmountForm {
    amount: number;
}

const defaultValues: ChangeArticleAmountForm = {
    amount: 0
}

const validationSchema = z.object({
    amount: z.number().gt(0, "Wartość musi być większa od 0")
});

const ModalArticleChangeAmount = ({ open, onClose, article }: ModalArticleChangeAmountProps) => {
    const { mutate: changeAmountMutate, isSuccess: changeAmountSuccess } = useChangeArticleAmount();
    const { control, handleSubmit } = useForm<ChangeArticleAmountForm>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!changeAmountSuccess) return;
        onClose();
    }, [changeAmountSuccess])

    const handleOnSubmit: SubmitHandler<ChangeArticleAmountForm> = (data) => {
        changeAmountMutate({ articleId: article.id, ...data });
    }

    return (
        <CustomModal isOpen={open} onClose={onClose}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid container spacing={2}>
                    <Grid item> <Typography variant="h3">Aktualizacja stanu magazynowego</Typography> </Grid>
                    <Grid item xs={12}>Nazwa: {article.name}</Grid>
                    <Grid item xs={12}>Kod produktu: {article.code}</Grid>
                    <Grid item xs={12}>Aktualny stan: {article.amount}</Grid>
                    <Grid item xs={12}>
                        <FormInput type={"number"} name={"amount"} label={"Stan magazynowy"} control={control} />
                    </Grid>
                    <Grid item container justifyContent={"flex-end"} spacing={2} >
                        <Grid item>
                            <Button variant="contained" color="error" onClick={onClose}>
                                Anuluj
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" type="submit">Aktualizuj</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    )
};

export default ModalArticleChangeAmount;