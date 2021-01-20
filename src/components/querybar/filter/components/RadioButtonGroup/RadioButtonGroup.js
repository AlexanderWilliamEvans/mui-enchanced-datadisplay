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
    const [label, setLabel ] = useState(props.label || '' );
    const [type, setType ] = useState(props.type || null);
    const [name, setName] = useState(props.name || '');
    const [values, setValues] = useState(props.data.values || []);
    const [selectedValue, setSelectedValue] = useState(values[0].value || null);

    const handleFilter = (e) => {
        setSelectedValue(e.target.value);
        const query = {filter: e.target.value, type: 'radio', name}
        props.handleFilter(query, 'filter');
    };

    useEffect(() => {

    }, [values, selectedValue]);

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{label}</FormLabel>
            <Divider />
            <RadioGroup aria-label="published" name="published" value={selectedValue} onChange={(e) => handleFilter(e)}>
                {
                    values.map((value) => {
                        return (
                            <FormControlLabel value={value.value} control={<Radio color="primary" />} label={value.label} />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    );

};
export default RadioButtonGroup;