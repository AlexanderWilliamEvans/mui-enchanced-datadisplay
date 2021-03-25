import React, { useState, useEffect, ChangeEvent } from "react";
import {
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import { RadioButtonGroupTypes } from "../../../types/RadioButtonGroup.types";


const RadioButtonGroup = (props: RadioButtonGroupTypes) => {
    const label = props.label || '';
    const type = props.type || 'radio';
    const name = props.name || '';
    const values = props.data.values || [];
    const [selectedValue, setSelectedValue] = useState('all');

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const target = (e.target as HTMLInputElement).value;
        setSelectedValue(target);
        const query = { filter: target, type, name }
        props.handleFilter(query, 'filter');
    };

    useEffect(() => {

    }, [values, selectedValue]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={Array.isArray(name) ? name.join() : name} name={Array.isArray(name) ? name.join() : name} value={selectedValue} onChange={(e) => handleFilter(e)}>
                <FormControlLabel value="all" control={<Radio color="primary" />} label="Alla" />
                {
                    values.map((value: any, index: string) => {
                        return (
                            <FormControlLabel key={`${value.label}-${index}`} value={value.value} control={<Radio color="primary" />} label={value.label} />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    );

};
export default RadioButtonGroup;