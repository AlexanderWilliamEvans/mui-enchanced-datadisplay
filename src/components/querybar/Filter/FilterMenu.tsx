import React from 'react';
import {
    makeStyles,
    Grid,
    FormLabel,
    Divider,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RadioButtonGroup from './components/RadioButtonGroup/RadioButtonGroup';
import RangeSlider from './components/RangeSlider/RangeSlider';
import DateRange from './components/DateRange/DateRange';
import Switch from './components/Switch/Switch';
import ChipList from './components/ChipList/ChipList';
import { FilterMenuTypes } from '../types/FilterMenu.types';
import HieracialChipList from './components/ChipList/Hierarchical';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridItem: {
        padding: theme.spacing(4),
    },
    headerGrid: {
        padding: 0,
    },
    clearFilterButton: {
        float: 'right',
        padding: 0,
        margin: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    filterContainer: {
        padding: theme.spacing(2),
        borderBottom: '1px solid #ccc'
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
    noLabel: {
        marginTop: theme.spacing(3),
    },

}));

interface IActiveFilter {
    name: string | Array<string>;
    type: string;
    filter: any;
};

interface filterKeys {
    name: Array<string>;
    type: string;
    filter: any;
}
/**
 * 
     * Summary: Filtermenu component for the querybar.
     *
     * Description. (use period)
     *
     * @since      x.x.x
     * @access     private
     *
     * @constructs namespace.Class
     * @augments   Parent 
     * @mixes      mixin
     *
     * @alias    FilterMenu
     * @memberof namespace
     *
     * @see   Function/class relied on
     * @link  URL
     * @fires Class#eventName
     *
     * @param {Object} props     The model's attributes.
     * @param {type}   attributes.key One of the model's attributes.
     * @param {Object} [options]      The model's options.
     * @param {type}   attributes.key One of the model's options.
     * @returns A filtermenu component with various types of filters.
 */
const FilterMenu = (props: FilterMenuTypes) => {
    const classes = useStyles();
    const filters = props.filters || [];
    const [activeFilters, setActiveFilters] = React.useState<IActiveFilter[]>([]);
    const activeFilterRef = React.useRef(activeFilters);

    const removeFilter = (filterKeys: Array<any>) => {        
        let newState = JSON.parse(JSON.stringify(activeFilters));
        for (let i = 0; i < filterKeys.length; i++) {
            const filterKey = Array.isArray(filterKeys[i].name) ? filterKeys[i].name.join() : filterKeys[i].name;

            const index = newState.findIndex((item: any) => {
                const currentFilter = Array.isArray(item.name) ? item.name.join() : item.name;
                return currentFilter === filterKey;
            });
            if (index !== -1) {
                newState.splice(index, 1);
            }

        }
        setActiveFilters(newState);
    };

    const handleFilter = (filter: Array<IActiveFilter> | any) => {
        let newState = [...activeFilters];
        if (Array.isArray(filter)) {
            for (let i = 0; i < filter.length; i++) {
                const index = newState.findIndex(x => {
                    if (Array.isArray(filter[i].name) && Array.isArray(x.name)) {
                        return x.name.join() === filter[i].name.join();
                    }
                    else {
                        return x.name === filter[i].name;
                    }
                });
                if (index !== -1) {
                    if (filter[i].filter.length > 0) {
                        newState[index] = filter[i];
                    }
                } else {
                    if (filter[i].filter.length > 0) {
                        newState.push(filter[i]);
                    }
                    else {
                        newState = newState.splice(index, 1);
                    }
                }
            }
        }
        else {
            const index = newState.findIndex(x => {
                if (Array.isArray(filter.name) && Array.isArray(x.name)) {
                    return x.name.join() === filter.name.join();
                }
                else {
                    return x.name === filter.name;
                }
            });
            if (index !== -1) {
                newState[index] = filter;
            } else {
                newState.push(filter);
            }
        }
        setActiveFilters(newState);
    };

    const clearFilter = () => {
        setActiveFilters([]);
    };


    const handleQuery = React.useCallback(() => {
        props.handleQuery(activeFilters, "filter");
    }, [props, activeFilters]);

    React.useEffect(() => {

        if (JSON.stringify(activeFilterRef.current) !== JSON.stringify(activeFilters)) {
            handleQuery();
            activeFilterRef.current = activeFilters;
        }
    }, [filters, activeFilters, handleQuery]);

    return (
        <div className={classes.filterContainer}>
            <Grid container spacing={4}>
                <Grid item xs={12} className={classes.headerGrid}>
                    <Tooltip title="Rensa filter">
                        <IconButton
                            className={classes.clearFilterButton}
                            color="primary"
                            onClick={() => clearFilter()}
                        >
                            <HighlightOffIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {
                    filters.length > 0 ? filters.map((filter, index) => {
                        switch (filter.type) {
                            case "hierachical":
                                return (
                                    <React.Fragment key={`${filter.name}-${index}`}>
                                        <HieracialChipList name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} removeFilter={removeFilter} />
                                    </React.Fragment>
                                )
                            case "radio":
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RadioButtonGroup name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                )
                            case "range":
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RangeSlider name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case "dateRange":
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <DateRange name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case "chip":
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <ChipList name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                )
                            case "switch":
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <Switch name={filter.name} value={filter.data.value} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            default:
                                return null;
                        }
                    }) : null
                }
            </Grid>

        </div>
    );
};

export default FilterMenu;