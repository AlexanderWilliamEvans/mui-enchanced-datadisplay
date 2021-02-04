import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteButton from './Delete/DeleteButton';
import ExportButton from './Export/ExportButton';
import UpdateButton from './Update/UpdateButton';

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        padding: theme.spacing(1),
        borderBottom: '1px solid #ccc',
        height: '75px'
    },
}));

const ButtonPanel = (props) => {
    const classes = useStyles();
    const showDelete = props.showDelete || true;
    useEffect(() => {

    }, [JSON.stringify(props)]);

    return (
        <div className={classes.buttonGroup}>
            <UpdateButton updateData={props.updateData} />
            {
                props.headers !== null && props.headers !== undefined ?
                <ExportButton exportData={props.exportData}  /> : null
            }
        </div>
    );
};
export default ButtonPanel;