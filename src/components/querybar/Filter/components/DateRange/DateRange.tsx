import React, { useState, useEffect, ChangeEvent } from "react";
import { makeStyles, Theme, createStyles, Typography, TextField  } from "@material-ui/core";
import { DateRangeTypes } from "../../../types/DateRange.types";

const useStyles = makeStyles((theme:Theme) => createStyles({
    datefield: {
        margin: theme.spacing(1)
    },
}));

const DateRange = (props:DateRangeTypes) => {

    const classes = useStyles();
    const type = props.type || 'range';
    const name = props.name || '';
    const [values, setValues] = useState(props.data.values || null);

    const handleTimeperiod = (e:ChangeEvent<{ value: unknown }>, period:any) => {
        let query;
        switch (period) {
            case 'start':
                setValues({ ...values, start: e.target.value });
                query = { name, filter: { start: e.target.value, end:values.end }, type };
                props.handleFilter(query, 'filter');
                break;
            case 'end':
                setValues({ ...values, end: e.target.value });
                query = { name, filter: { end: e.target.value, start: values.start }, type };
                props.handleFilter(query, 'filter');
                break;
            default:
                break;
        }
    };

    useEffect(()=>{

    }, []);
    return (
        <form noValidate>
        <Typography variant="body2">{props.title}</Typography>
        <TextField
            label="Från"
            type="date"
            onChange={(e) => handleTimeperiod(e, 'start')}
            defaultValue={values.start}
            className={classes.datefield}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            label="Till"
            type="date"
            onChange={(e) => handleTimeperiod(e, 'end')}
            defaultValue={values.end}
            className={classes.datefield}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </form>
    );
}
export default DateRange;