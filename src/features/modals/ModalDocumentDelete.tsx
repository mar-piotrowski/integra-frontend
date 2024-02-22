import { Button, Grid, Typography } from "@mui/material"
import CustomModal from "../../components/CustomModal"
import { ModalBaseProps } from "../../interfaces/modal"
import React, { useEffect } from "react"
import useDeleteDocument from "../../hooks/documents/useDeleteDocument"

interface ModalArticleDeleteProps extends ModalBaseProps {
    documentId: number
}

const ModalDocumentDelete = ({ open, onClose, documentId }: ModalArticleDeleteProps) => {
    const { mutate, isSuccess} = useDeleteDocument();

    useEffect(() => {
        if (!isSuccess) return;
        onClose();
    }, [isSuccess])

    const handleDeleteArticle = () => mutate(documentId);

    return (
        <CustomModal isOpen={open} onClose={onClose}>
            <Grid container>
                <Grid item xs={12} mb={3} textAlign={"center"}>
                    <Typography variant="h3">Czy na pewno chcesz usunąć dokument?</Typography>
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

export default ModalDocumentDelete;
