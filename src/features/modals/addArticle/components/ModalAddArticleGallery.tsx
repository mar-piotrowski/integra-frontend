import { Control } from "react-hook-form";
import { ArticleForm } from "../ModalArticle";
import React from "react";
import { Button, Grid } from "@mui/material";

interface ModalAddArticleDetailsProps {
    control: Control<ArticleForm>
}

const ModalAddArticleGallery = ({ control }: ModalAddArticleDetailsProps) => {
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item>
                <Button variant={"contained"}>Dodaj obraz</Button>
            </Grid>
        </Grid>
    )
}

export default ModalAddArticleGallery;