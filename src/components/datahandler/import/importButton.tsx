import React, { Fragment, useState, useEffect, useCallback } from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';

interface props {
    label?: string;
    allowedFiletypes?: Array<string>;
};
const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    input: {
        visibility:"hidden"
    }
}));
const ImportButton = (props: props) => {
    const classes = useStyles();

    const uploadData = (file:any) => {
        switch (file) {
            case "csv" || "xls":
                let lines = file.split("\n");

                const result = [];

                const headers = lines[0].split(",");

                for (let i = 1; i < lines.length; i++) {

                    let obj: any = {};
                    let currentline = lines[i].split(",");

                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }

                    result.push(obj);

                }
                return JSON.stringify(result);
        }
    };
    useEffect(() => {

    }, []);
    return (
        <Fragment>
            <input
                accept="image/*"
                className={classes.input}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button 
                variant="contained"
                color="primary"
                startIcon={<BackupIcon />}
                component="span" 
                className={classes.button}>
                    {props.label || "Import Data"}
                </Button>
            </label>
        </Fragment>
    );
};
export default ImportButton;