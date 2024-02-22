import {ModalBaseProps} from "../../../interfaces/modal";
import CustomModal from "../../../components/CustomModal";
import React, {useEffect} from "react";
import {Button, Grid,  Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ModalAddArticleDetails from "./components/ModalAddArticleDetails";
import useCreateArticle from "../../../hooks/article/useCreateArticle";
import {ArticleDto} from "../../../api/types/articleTypes";
import useEditArticle from "../../../hooks/article/useEditArticle";

interface ModalAddArticleProps extends ModalBaseProps {
    articleToEdit?: ArticleDto | null;
}

export interface ArticleForm {
    name: string;
    code: string;
    gtin: string;
    pkwiu: string;
    measureUnit: string;
    buyPriceWithoutTax: number;
    buyPriceWithTax: number;
    sellPriceWithoutTax: number;
    sellPriceWithTax: number;
    image: string;
    tax: number;
    description: string;
}

const defaultValues: ArticleForm = {
    name: "",
    code: "",
    gtin: "",
    measureUnit: "",
    pkwiu: "",
    buyPriceWithoutTax: 0,
    buyPriceWithTax: 0,
    sellPriceWithoutTax: 0,
    sellPriceWithTax: 0,
    image: "",
    tax: 0,
    description: ""
}

const schema = z.object({
    name: z.string().min(1, "Pole jest wymagane"),
    code: z.string().min(1, "Kod produktu jest wymagany"),
    measureUnit: z.string().min(1, "Pole jest wymagane"),
    gtin: z.string().optional(),
    tax: z.number().gt(0, "Wybierz stawke vat!"),
    pkwiu: z.string().nullable().optional(),
    sellPriceWithoutTax: z.number().gt(0, "Pole wymagane!"),
    sellPriceWithTax: z.number().gt(0, "Pole wymagane!"),
    buyPriceWithoutTax: z.number().optional(),
    buyPriceWithTax: z.number().optional()
})

const ModalArticle = ({open, onClose, articleToEdit}: ModalAddArticleProps) => {
    const {mutate: createArticle, isSuccess: createArticleSuccess} = useCreateArticle();
    const {mutate: editArticle, isSuccess: editArticleSuccess} = useEditArticle();
    const {control, reset, handleSubmit, setValue} = useForm<ArticleForm>({
        defaultValues,
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (articleToEdit == null) return;
        reset({...articleToEdit});
    }, [open, articleToEdit, reset])

    useEffect(() => {
        if (!editArticleSuccess) return;
        handleOnClose();
    }, [editArticleSuccess])

    useEffect(() => {
        if (!createArticleSuccess) return;
        handleOnClose();
    }, [createArticleSuccess])


    const onSubmitHandler: SubmitHandler<ArticleForm> = (data) => {
        if (articleToEdit != null) {
            editArticle({...data, id: articleToEdit.id});
            return;
        }
        createArticle({...data, stockAmount: 0});
    };

    const handleOnClose = () => {
        onClose();
        reset(defaultValues);
    }

    return (
        <CustomModal isOpen={open} onClose={handleOnClose}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Dodawanie nowego produktu</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ModalAddArticleDetails control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"} spacing={1} xs={12}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={handleOnClose}>
                                Anuluj
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" type="submit">
                                {articleToEdit != null ? "Edytuj" : "Dodaj"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    )
}

export default ModalArticle;