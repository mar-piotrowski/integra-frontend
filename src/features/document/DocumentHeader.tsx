import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

interface DocumentHeaderProps {
    title: string;
    setLockDocument: () => void;
}

const DocumentHeader = ({title, setLockDocument}: DocumentHeaderProps) => {
    const navigate = useNavigate();
    return (
        <Grid item container>
            <Grid item xs={6}>
                <Typography variant={"h3"} mb={2}>{title}</Typography>
            </Grid>
            <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end", gap: "10px",}}>
                <Button
                    disableElevation
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={setLockDocument}
                >
                    Zapisz na stale
                </Button>
                <Button
                    disableElevation
                    variant="contained"
                    type="submit"
                    color="primary"
                >
                    Zapisz tymczasowo
                </Button>
            </Grid>
        </Grid>
    )
};

export default DocumentHeader;