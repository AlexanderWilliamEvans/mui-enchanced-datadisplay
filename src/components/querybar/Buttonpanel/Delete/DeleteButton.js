import React, {useState, useEffect} from 'react';
import { makeStyles, Grow, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({ 
    deleteButton: {
        float: 'left',
        paddingLeft: '3px'
    },

}));
const DeleteButton = (props) => {
    const classes = useStyles();
    useEffect(() => {

    }, []);
    return (
        <Grow in={true} timeout={500}>
        <Tooltip title="Ta bort valda rader">
            <IconButton
                className={classes.deleteButton}
                color="secondary"
                onClick={() => props.handleDelete()}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    </Grow>
    );
};
export default DeleteButton;