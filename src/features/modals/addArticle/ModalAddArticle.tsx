import {ModalBaseProps} from "../../../interfaces/modal";
import CustomModal from "../../../components/CustomModal";
import React, {SyntheticEvent} from "react";
import {Button, Grid, Tab, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/system";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ModalAddArticleDetails from "./components/ModalAddArticleDetails";
import ModalAddArticleGallery from "./components/ModalAddArticleGallery";

interface ModalAddArticleProps extends ModalBaseProps {
}

export interface AddArticleForm {
    groupId: number;
    name: string;
    code: string;
    type: string;
    gtin: string;
    pkwiu: string;
    measureUnit: string;
    buyPrice: number;
    buyCurrency: number;
    sellPrice: number;
    sellCurrency: number;
    image: string;
    vat: number;
    description: string;
}

const addArticleDefaultValues: AddArticleForm = {
    groupId: 0,
    name: "",
    code: "",
    type: "",
    gtin: "",
    measureUnit: "",
    pkwiu: "",
    buyPrice: 0,
    buyCurrency: 0,
    sellPrice: 0,
    sellCurrency: 0,
    image: "",
    vat: 0,
    description: ""
}


const schema = z.object({
    name: z.string().min(1, "Pole jest wymagane"),
    code: z.string().min(1, "Kod produktu jest wymagany"),
    measureUnit: z.string().min(1, "Pole jest wymagane"),
    gtin: z.string().min(1, "Pole jest wymagane"),
    vat: z.number().gte(0, "Wybierz stawke vat!"),
})

const ModalAddArticle = ({open, onClose}: ModalAddArticleProps) => {
    const [value, setValue] = React.useState("1");
    const {control, reset, handleSubmit, formState: {errors}} = useForm<AddArticleForm>({
        defaultValues: addArticleDefaultValues,
        resolver: zodResolver(schema)
    });

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);
    const onSubmitHandler: SubmitHandler<AddArticleForm> = (data) => {console.log(data)};

    const extendedOnCloseModal = () => {
        onClose();
        reset();
    }

    return (
        <CustomModal open={open} onClose={extendedOnCloseModal}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nowego produktu</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Podstawowe informacje" value="1"/>
                                    <Tab label="Galeria" value="2"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ModalAddArticleDetails control={control}/>
                            </TabPanel>
                            <TabPanel value="2">
                                <ModalAddArticleGallery control={control}/>
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
                                <Button variant="contained" color="error" onClick={extendedOnCloseModal}>
                                    Anuluj
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Dodaj
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalAddArticle;