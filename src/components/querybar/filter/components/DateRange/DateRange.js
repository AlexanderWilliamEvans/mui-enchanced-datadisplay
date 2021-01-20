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
    const [values, setValues] = useState(props.data.values || null);

    const handleTimeperiod = () => {

    };

    useEffect(()=>{

    }, []);
    return (
        <form className={classes.datecontainer} noValidate>
        <Typography variant="body2">{props.title}</Typography>
        <TextField
            id="date"
            label="Från"
            type="date"
            onChange={(e) => handleTimeperiod(e, 'start', props.data.name)}
            defaultValue={values.start}
            className={classes.datefield}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            id="date"
            label="Till"
            type="date"
            onChange={(e) => handleTimeperiod(e, 'end', props.data.name)}
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