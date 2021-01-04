import React, { useEffect, useState } from 'react';
import {
  IconButton, AppBar, Typography, InputBase, Toolbar, Tooltip, Collapse,
  FormControl, FormControlLabel, FormLabel, Radio, NativeSelect, InputLabel
} from '@material-ui/core';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import FilterMenu from './filter/FilterMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  filler: {
    flexGrow: 1,
  },
  search: {
    width: '150px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({

  input: {
    minWidth: '100px',
    width: 'auto',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const Querybar = (props) => {

  debugger;
  const classes = useStyles();
  const data = []
  const [dataQuery, setDataQuery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('sortera');
  const [sortOptions, setSortOptions] = useState(props.sort || []);
  const [search, setSearch] = useState('');
  const [collapseFilter, setCollapseFilter] = useState(false);

  const handleQuery = (e, type) => {
    debugger;
    const query = e.target !== undefined ? e.target.value : e;
    let test = data;
    if (data.length > 0) {
      test = handleSort(query, test);

      if (type === 'filter' || filter !== 'all') {
        for (let i = 0; i < query.length; i++) {
          if (query[i].active) {
            test = handleFilter(query[i], test);
          }
        }
      }

      if (type === 'search') {
        test = handleSearch(query, test);
      }
      setDataQuery(test);
      props.onDataChanged(test);
    }

  };

  const handleSort = (param, data) => {
    let result;

  };

  const handleFilter = (param, data) => {
    let result;


  };

  const handleSearch = (param, data) => {
    const searchString = param.toString().toLowerCase().trim();
    if (searchString !== "") {
      data = data.filter((item) => {
        return item.title.toLowerCase().includes(searchString);
      });
      setSearch(searchString);
    }
    return data;
  };
  debugger;

  useEffect(() => {

  }, [sortOptions]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Filtrera">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="filtrera"
              onClick={() => setCollapseFilter(!collapseFilter)}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={sort}
              onChange={(e) => handleQuery(e, 'sort')}
              input={<BootstrapInput />}
            >
              {
                sortOptions.map(sortOption => {
                  return (
                    <option value={sortOption.name}>{sortOption.name}</option>
                  );
                })
              }
            </NativeSelect>
          </FormControl>
          <div className={classes.filler} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => handleQuery(e, 'search')}
              placeholder={props.placeholder || 'Sök...'}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'sök på namn' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Collapse in={collapseFilter}>
        <FilterMenu handleQuery={handleQuery} authors={props.authors} date={props.date} />
      </Collapse>
    </div>
  );

};

export default Querybar;