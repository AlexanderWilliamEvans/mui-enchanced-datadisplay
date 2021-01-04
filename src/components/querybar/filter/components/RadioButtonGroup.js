import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    FormControlLabel,
    Divider,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';

const useStyles = makeStyles({

});

const RadioButtonGroup = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState(props.values || []);
    const [selectedValue, setSelectedValue] = useState(values[0] || null);

    const handleFilter = (e) => {
        setSelectedValue(e.target.value);
    };

    useEffect(() => {

    }, [values, selectedValue]);

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Status</FormLabel>
            <Divider />
            <RadioGroup aria-label="published" name="published" value={selectedValue} onChange={(e) => handleFilter(e)}>
                <FormControlLabel value="all" control={<Radio color="primary" />} label="Alla" />
                <FormControlLabel value="published" control={<Radio color="primary" />} label="Publicerad" />
                <FormControlLabel value="notPublished" control={<Radio color="primary" />} label="Inte Publicerad" />
            </RadioGroup>
        </FormControl>
    );

};
export default RadioButtonGroup;