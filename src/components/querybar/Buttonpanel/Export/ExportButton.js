import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    exportButton: {
        float: 'right',
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
}));

const ExportButton = (props) => {
    const classes = useStyles();
    

    useEffect(() => {

    }, [props]);

    return (
        <Button
            variant="contained"
            className={classes.exportButton}
            color="primary"
            startIcon={<GetAppIcon />}
            onClick={() => props.exportData()}
        >
            Exportera data
        </Button>
    );
};
export default ExportButton;