import { Button, Grid, Typography } from "@mui/material"
import CustomModal from "../../components/CustomModal"
import { ModalBaseProps } from "../../interfaces/modal"
import React, { useEffect } from "react"
import useDeleteArticle from "../../hooks/article/useDeleteArticle"

interface ModalArticleDeleteProps extends ModalBaseProps {
    articleId: number
}

const ModalArticleDelete = ({ open, onClose, articleId }: ModalArticleDeleteProps) => {
    const { mutate: deleteArticelMutate, isSuccess: deleteArticleSuccess } = useDeleteArticle();

    useEffect(() => {
        if (!deleteArticleSuccess) return;
        onClose();
    }, [deleteArticleSuccess])

    const handleDeleteArticle = () => deleteArticelMutate(articleId);

    return (
        <CustomModal isOpen={open} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} mb={3} textAlign={"center"}>
                    <Typography variant="h3">Czy na pewno chcesz usunąć artykuł?</Typography>
                </Grid>
                <Grid item container justifyContent={"center"} spacing={2} >
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={onClose}>Anuluj</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            type="submit"
                            color={"error"}
                            onClick={handleDeleteArticle}
                        >
                            Usuń
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default ModalArticleDelete;
