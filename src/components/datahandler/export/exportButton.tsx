import React from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';

interface props {
    label?: string;
    color?: string;
};
const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    input: {
        visibility: "hidden"
    }
}));

const ExportButton = (props: props) => {

    const classes = useStyles();
    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<PublishIcon />}
        >
            {props.label || "Export Data"}
        </Button>
    );
};
export default ExportButton;