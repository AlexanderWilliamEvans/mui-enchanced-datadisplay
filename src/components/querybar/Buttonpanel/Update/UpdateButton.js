import React, { useEffect } from 'react';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    updatebutton: {
        float: 'right',
        padding: theme.spacing(1),
        margin: theme.spacing(1)

    },
}));

const UpdateButton = (props) => {
    const classes = useStyles();
    const title = props.title || "Uppdatera innehåll";
    useEffect(() => {

    }, [props]);

    return (
        <Tooltip title={title}>
            <IconButton
                className={classes.updatebutton}
                color="primary"
                onClick={() => props.updateData()}
            >
                <RefreshIcon />
            </IconButton>
        </Tooltip>
    );
};
export default UpdateButton;