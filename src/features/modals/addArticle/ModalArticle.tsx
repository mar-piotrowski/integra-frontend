import { ModalBaseProps } from "../../../interfaces/modal";
import CustomModal from "../../../components/CustomModal";
import React, { SyntheticEvent, useEffect } from "react";
import { Button, Grid, Tab, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ModalAddArticleDetails from "./components/ModalAddArticleDetails";
import ModalAddArticleGallery from "./components/ModalAddArticleGallery";
import useCreateArticle from "../../../hooks/article/useCreateArticle";
import { ArticleDto } from "../../../api/types/articleTypes";
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
    buyPriceWithoutTax: z.number().gt(0, "Pole wymagane!"),
    buyPriceWithTax: z.number().gt(0, "Pole wymagane!"),
    sellPriceWithoutTax: z.number().optional(),
    sellPriceWithTax: z.number().optional()
})

const ModalArticle = ({ open, onClose, articleToEdit }: ModalAddArticleProps) => {
    const { mutate: createArticle, isSuccess: createArticleSuccess } = useCreateArticle();
    const { mutate: editArticle, isSuccess: editArticleSuccess } = useEditArticle();
    const [value, setValue] = React.useState("1");
    const { control, reset, handleSubmit } = useForm<ArticleForm>({
        defaultValues,
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (!articleToEdit) return;
        reset({ ...articleToEdit });
    }, [articleToEdit])

    useEffect(() => {
        if (!editArticleSuccess) return;
        handleOnClose();
    }, [editArticleSuccess])

    useEffect(() => {
        if (!createArticleSuccess) return;
        handleOnClose();
    }, [createArticleSuccess])

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    const onSubmitHandler: SubmitHandler<ArticleForm> = (data) => {
        if (articleToEdit != null) {
            editArticle({ ...data, id: articleToEdit.id });
            return;
        }
        createArticle({ ...data });
    };

    const handleOnClose = () => {
        onClose();
        reset(defaultValues);
    }

    return (
        <CustomModal isOpen={open} onClose={handleOnClose}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nowego produktu</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Podstawowe informacje" value="1" />
                                    <Tab label="Galeria" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ModalAddArticleDetails control={control} />
                            </TabPanel>
                            <TabPanel value="2">
                                <ModalAddArticleGallery control={control} />
                            </TabPanel>
                        </TabContext>
                        <Grid
                            item
                            container
                            justifyContent={"flex-end"}
                            spacing={1}
                            xs={12}
                        >
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
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalArticle;