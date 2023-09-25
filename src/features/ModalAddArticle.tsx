import React from "react";
import CustomModal from "../components/CustomModal";
import {Grid, Typography} from "@mui/material";

interface ModalAddArticleProps {
    open: boolean;
    onClose: () => void;
}

const ModalAddArticle = ({open, onClose}: ModalAddArticleProps) => {
    return (
        <CustomModal open={open} onClose={onClose}>
           <Grid container spacing={3}>
               <Grid item>
                   <Typography variant={"h3"}>Dodawanie produktu</Typography>
               </Grid>
           </Grid>
        </CustomModal>
    )
}

export default  ModalAddArticle;