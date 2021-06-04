import React from "react";
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
    Grid,
    FormLabel,
    Divider,
} from '@material-ui/core';
import { hierachialChipListProps } from "../../../types/ChipList.types";
import ChipList from "./ChipList";

const useStyles = makeStyles((theme) => ({
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
    name: string | Array<string>,
    type: string,
    filter: any,
};

const HieracialChipList = (props: hierachialChipListProps) => {

    const classes = useStyles();
    const [chipLists, setChipLists] = React.useState<any>(props.data || []);
    const filterKeys = React.useRef<any>(null);
    const [activeFilters, setActiveFilters] = React.useState<any>([]);
    const activeFilterRef = React.useRef(activeFilters);
    const [gridSize, setGridSize] = React.useState<any>(props.gridSize || 12);

    // Filter if selected has values or else disable all chiplists that's lower in hierachy.
    const onSelected = (list: Array<IActiveFilter> | any) => {
        let chips = JSON.parse(JSON.stringify(chipLists));
        const filters = JSON.parse(JSON.stringify(activeFilters));
        const targetIndex = chips.findIndex((chipList: any) => {
            if (Array.isArray(list.name) && Array.isArray(chipList.name)) {
                return list.name.join() === chipList.name.join();
            }
            else {
                return list.name === chipList.name;
            }
        });
        const startIndex = targetIndex + 1;
        if (list.filter.length < 1) {
            if(startIndex < chips.length) {
                for (let i = startIndex; i < chips.length; i++) {
                    chips[i].disabled = true;
                }
                setActiveFilters( filters.slice(0, startIndex-1));
                setChipLists(chips);
            }
                props.removeFilter(filters.slice(startIndex));
        } else {
            let newState = [...activeFilters];
            const index = newState.findIndex(x => {
                if (Array.isArray(list.name) && Array.isArray(x.name)) {
                    return x.name.join() === list.name.join();
                }
                else {
                    return x.name === list.filter.name;
                }
            });
            if (index !== -1) {
                newState[index] = list;
            } else {
                newState.push(list);
            }
            if( startIndex < chips.length) {
                chips[startIndex].disabled = false;
            }
            setChipLists(chips);
            setActiveFilters(newState);
        }
    };

    React.useEffect(() => {
        if(filterKeys.current === null && chipLists.length > 0) {
            const keys = chipLists.map((val:any) => {
                return val.name;
            });
            filterKeys.current = keys;
        }
        if (chipLists.length > 0 && !props.gridSize) {
            setGridSize(Math.floor(12 / chipLists.length));
        }
        if (JSON.stringify(activeFilterRef.current) !== JSON.stringify(activeFilters)) {
            if(activeFilters.length === 0) {
                props.removeFilter(activeFilterRef.current);
            }
            else {
                props.handleFilter(activeFilters, 'filter');
            }
            activeFilterRef.current = activeFilters;
        }
    }, [JSON.parse(JSON.stringify(chipLists)), activeFilters]);

    return (
        <React.Fragment>
            {
                chipLists.map((item: any, index: number) => {
                    return (
                        <Grid key={`${item.name}-${index}`} item xs={gridSize} className={classes.gridItem}>
                            <FormLabel component="legend">{item.label}</FormLabel>
                            <Divider />
                            <ChipList name={item.name} type={"list"} disabled={item.disabled || false} data={item.data} handleFilter={onSelected} />
                        </Grid>
                    )
                })
            }
        </React.Fragment>
    );
};
export default HieracialChipList;