import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, TextField  } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    datefield: {
        margin: theme.spacing(1)
    },
}));

const DateRange = (props) => {

    const classes = useStyles();
    const [data, setData] = useState(props.data || []);
    const [label, setLabel ] = useState(props.label || '' );
    const [type, setType ] = useState(props.type || 'range');
    const [name, setName] = useState(props.name || '');
    const [values, setValues] = useState(props.data.values || null);

    const handleTimeperiod = (e, period) => {
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
        <form className={classes.datecontainer} noValidate>
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