import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    makeStyles,
    useTheme,
    Theme,
    FormControl,
    InputLabel,
    Input,
    Chip,
    MenuItem,
    Select,
    createStyles
} from '@material-ui/core';
import { ChipListTypes } from "../../../types/ChipList.types";

const useStyles = makeStyles((theme: Theme) => createStyles({
    chipformControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 400,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chipContainer: {
        border: '1px solid #ccc',
        padding: theme.spacing(1),
        minWidth: 500,
        maxWidth: 500,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    chip: {
        margin: 2,
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ChipList = (props: ChipListTypes) => {

    const classes = useStyles();
    const theme = useTheme();

    const label = props.label || '';
    const type = props.type || 'list';
    const name = props.name || '';
    const values = props.data.values || [];
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const getStyles = (name: string, personName: string[], theme: Theme) => {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };


    const handleFilter = (e: ChangeEvent<{ value: unknown }>) => {

        const target = e.target.value as string[];
        setSelectedValues(target);
        const query = { filter: target.length > 0 ? target : values, type: 'list', name }
        props.handleFilter(query, 'filter');
    };

    const removeChip = (e:any, removed: string | number) => {
        let newState = selectedValues.filter((selected) => {
            return selected !== removed;
        });
        setSelectedValues(newState);
        const query = { filter: newState.length > 0 ? newState : values, type: 'list', name };
        props.handleFilter(query, 'filter');
    };

    useEffect(() => {

    }, [values]);

    return (
        <FormControl className={classes.chipformControl}>
            <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
            <Select
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                labelId="demo-mutiple-chip-label"
                multiple
                value={selectedValues}
                onChange={(e) => handleFilter(e)}
                input={<Input id={`select-multiple-chip-${Math.random() * Math.random()}`} />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                                clickable ={true}
                                color="primary"
                               onDelete={(e) => removeChip(e, value)}
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                            />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {values.map((value:any) => (
                    <MenuItem key={value} value={value} style={getStyles(value, selectedValues, theme)}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ChipList;