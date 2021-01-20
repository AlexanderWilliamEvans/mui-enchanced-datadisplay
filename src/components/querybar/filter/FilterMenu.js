import React, { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import {
    makeStyles,
    useTheme,
    Grid,
    InputLabel,
    Typography,
    TextField,
    FormLabel,
    FormControl,
    Divider,
} from '@material-ui/core';
import RadioButtonGroup from './components/RadioButtonGroup/RadioButtonGroup';
import RangeSlider from './components/RangeSlider/RangeSlider';
import DateRange from './components/DateRange/DateRange';
import Switcher from './components/Switcher/Switcher';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    buttonGroup: {
        padding: theme.spacing(1),
        borderBottom: '1px solid #ccc',
        height: '75px'
    },
    filterContainer: {
        padding: theme.spacing(2),
        borderBottom: '1px solid #ccc'
    },
    datecontainer: {

    },
    datefield: {
        margin: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(1),
    },
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
    noLabel: {
        marginTop: theme.spacing(3),
    },

}));



const FilterMenu = (props) => {
    debugger;
    const theme = useTheme();
    const classes = useStyles();
    const [filters, setFilters] = useState(props.filters || []);
    const [published, setPublished] = useState('all');
    const [creators, setCreators] = useState([{ name: 'SOKIGO/ALEV', id: 66 }, { name: 'SOKIGO/HEAN', id: 662 }, { name: 'SOKIGO/FRLU', id: 3 }]);
    const [selectedCreators, setSelectedCreators] = useState(creators);
    const [updatedTimePeriod, setUpdatedTimePeriod] = useState({
        start: new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10)
    });
    const [createdTimePeriod, setCreatedTimePeriod] = useState({
        start: new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10)
    });
    const [activeFilters, setActiveFilters] = useState([
      /*  {name: 'gender', type: 'radio', filter: ['male', 'female']},
        {name:'year', type: 'range', filter: [1920, 1970]},
        {name: 'born', type: 'dateRange', filter: ['2010-07-10', '2012-04-12']}*/
    ]);
    const activeFilterRef = useRef(activeFilters);

    const handleFilter = (filter) => {
        let newState = [...activeFilters];
        const index = newState.findIndex(x => x.name === filter.name);
        if(index !== -1) {
            newState[index] = filter;
        } else {
            newState.push(filter);
        }
        setActiveFilters(newState);
    };

    const handleTimeperiod = (e, period, type) => {
        debugger;
        let data;
        let newState;
        switch (type) {
            case 'created':
                switch (period) {
                    case 'start':
                        setCreatedTimePeriod({ ...createdTimePeriod, start: e.target.value });
                        data = { name: 'created', active: true, filter: { start: e.target.value, end: createdTimePeriod.end } };
                        newState = [...activeFilters];
                        newState[1] = data;
                        setActiveFilters(newState);
                        break;
                    case 'end':
                        setCreatedTimePeriod({ ...createdTimePeriod, end: e.target.value });
                        data = { name: 'created', active: true, filter: { end: e.target.value, start: createdTimePeriod.start } };
                        newState = [...activeFilters];
                        newState[1] = data;
                        setActiveFilters(newState);
                        break;
                    default:
                        break;
                }
                break;
            case 'updated':
                switch (period) {
                    case 'start':
                        setUpdatedTimePeriod({ ...updatedTimePeriod, start: e.target.value });
                        data = { name: 'updated', active: true, filter: { start: e.target.value, end: updatedTimePeriod.end } };
                        newState = [...activeFilters];
                        newState[2] = data;
                        debugger;
                        setActiveFilters(newState);
                        break;
                    case 'end':
                        setUpdatedTimePeriod({ ...updatedTimePeriod, end: e.target.value });
                        data = { name: 'updated', active: true, filter: { end: e.target.value, start: updatedTimePeriod.start } };
                        newState = [...activeFilters];
                        newState[2] = data;
                        setActiveFilters(newState);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

    };



    const handleQuery = useCallback(() => {
        props.handleQuery(activeFilters, 'filter');
    }, [props, activeFilters]);

    useEffect(() => {

        if (JSON.stringify(activeFilterRef.current) !== JSON.stringify(activeFilters)) {
            handleQuery(activeFilters, 'filter');
            activeFilterRef.current = activeFilters;
        }
    }, [filters, activeFilters, handleQuery]);

    return (
        <div className={classes.filterContainer}>
            <Grid container spacing={4}>
                {
                    filters.length > 0 ? filters.map((filter) => {
                        switch (filter.type) {
                            case 'radio':
                                return (
                                    <Grid item xs={6}>
                                            <FormLabel component="legend">{filter.label}</FormLabel>
                                            <Divider />
                                            <RadioButtonGroup name = {filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                )
                            case 'range':
                                return (
                                    <Grid item xs={6}>
                                            <FormLabel component="legend">{filter.label}</FormLabel>
                                            <Divider />
                                            <RangeSlider name = {filter.name} data={filter.data} label={filter.label} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'dateRange':
                                return (
                                    <Grid item xs={6}>
                                            <FormLabel component="legend">{filter.label}</FormLabel>
                                            <Divider />
                                            <DateRange name = {filter.name} data={filter.data} handleQuery={props.handleQuery} />
                                    </Grid>
                                );
                            case 'chip':
                                return true;
                            case 'switch':
                                return (
                                    <Switcher />
                                );
                            default:
                                return null;
                        }
                    }) : null
                }
                <Grid item xs={6}>
                    <FormControl className={classes.chipformControl}>
                        <InputLabel id="demo-mutiple-chip-label">Skapad av</InputLabel>
                        {/* <Select
                            onMouseDown={(event) => {
                                event.stopPropagation();
                            }}
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={selectedCreators}
                            onChange={(e) => filterCreatedBy(e)}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => 
                                    (
                                        <Chip
                                            key={value}
                                            label={value}
                                            className={classes.chip}
                                            clickable
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
                            {creators.map((creator) => (
                                <MenuItem key={creator.id} value={creator.name} style={getStyles(creator.name, selectedCreators, theme)}>
                                    {creator.name}
                                </MenuItem>
                            ))}
                        </Select> */}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <form className={classes.datecontainer} noValidate>
                        <Typography variant="body2">Updaterad</Typography>
                        <TextField
                            id="date"
                            label="Från"
                            type="date"
                            onChange={(e) => handleTimeperiod(e, 'start', 'updated')}
                            defaultValue={updatedTimePeriod.start}
                            className={classes.datefield}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="Till"
                            type="date"
                            onChange={(e) => handleTimeperiod(e, 'end', 'updated')}
                            defaultValue={updatedTimePeriod.end}
                            className={classes.datefield}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <form className={classes.datecontainer} noValidate>
                        <Typography variant="body2">Skapad</Typography>
                        <TextField
                            id="date"
                            label="Från"
                            type="date"
                            onChange={(e) => handleTimeperiod(e, 'start', 'updated')}
                            defaultValue={updatedTimePeriod.start}
                            className={classes.datefield}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="Till"
                            type="date"
                            onChange={(e) => handleTimeperiod(e, 'end', 'updated')}
                            defaultValue={updatedTimePeriod.end}
                            className={classes.datefield}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>
            </Grid>

        </div>
    );
};

export default FilterMenu;