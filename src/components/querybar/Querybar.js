import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  IconButton, AppBar, Typography, InputBase, Toolbar, Tooltip, Collapse,
  FormControl, NativeSelect, InputLabel, Divider
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

  const classes = useStyles();
  const data = props.data || [];
  const [displayedData, setDisplayedData] = useState(props.data || []);
  const displayedDataRef = useRef();
  const [dataQuery, setDataQuery] = useState([]);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState(props.sort[0].name || 'sortera');
  const [sortOptions, setSortOptions] = useState(props.sort || []);
  const [search, setSearch] = useState('');
  const [collapseFilter, setCollapseFilter] = useState(false);

  const handleQuery = (e, type) => {
    const query = e.target !== undefined ? e.target.value : e;
    let test = JSON.parse(JSON.stringify(data));
    debugger;
    if (data.length > 0) {
      if (type === 'sort' || sort.length > 0) {
        test = handleSort(type === 'sort' ? JSON.parse(query) : sort, test);
      }

      if (type === 'filter' || filter.length > 0) {
        if(type === 'filter') {
          for (let i = 0; i < query.length; i++) {     
            test = handleFilter(query[i], test);
        }
        setFilter(query);
        }
        else {
          for (let i = 0; i < filter.length; i++) {     
            test = handleFilter(filter[i], test);
        }
        }
      }

      if (type === 'search' || search.length > 0) {
        test = handleSearch(type === 'search' ?  query : search, test);
      }
      setDataQuery(test);
      setDisplayedData(test);
    }

  };

  const handleSort = (param, data) => {
    let result;
    if (data[0].hasOwnProperty(param.key)) {
      switch (param.type.toLowerCase()) {
        case 'string':
          result = data.sort((a, b) => {
            return a[param.key].localeCompare(b[param.key], 'sv', { ignorePunctuation: true })
          });
          result = param.order.toLowerCase() === 'asc' ? result : result.reverse();
          setSort(param);
          console.log(JSON.stringify(result));
          return result;
        case 'int':
          result = data.sort((a, b) => {
            return a[param.key] - b[param.key];
          });
          result = param.order.toLowerCase() === 'asc' ? result : result.reverse();
          setSort(param);
          console.log(JSON.stringify(result));
          return result;
        case 'date':
          result = data.sort((a, b) => {
            return new Date(a[param.key]).getTime() - new Date(b[param.key]).getTime();
          });
          result = param.order.toLowerCase() === 'asc' ? result : result.reverse();
          setSort(param);
          return result;
        default:
          return data;
      }
    }
    return data;

  };

  const handleFilter = (param, data) => {
    let result;
    debugger;
    if (data[0].hasOwnProperty(param.name)) {
      switch (param.type) {
        case 'radio':
          if(param.filter === 'all') {
            result = data;
          }
          else {
            result = data.filter((item) =>{
              return item[param.name].toLowerCase() === param.filter.toLowerCase();
            });
          }
          return result;
        case 'list':
          result = data.filter((item) =>{
            return param.filter.indexOf(item[param.name]) !== -1;
          });
          return result;
        case 'bool':
          result = data.filter((item) => {
            return item.published
          });
          return result;

        case 'range':
          result = data.filter((item) => {
           return item[param.name] <= param.filter.end && item[param.name] >= param.filter.start;
          });
          return result;
        default:
          return data;
      }
    }
    return data;


  };

  const handleSearch = (param, data) => {
    let result;
    const searchString = param.toString().toLowerCase().trim();
    if (searchString !== "") {
      result = data.filter((obj) => {
        return Object.keys(obj).some((key) => {
          if (obj[key] !== null) {
            return obj[key].toString().toLowerCase().includes(searchString);
          }
        })
      });
      setSearch(searchString);
      return result;
    }
    return data;
  };




  useEffect(() => {
    if (JSON.stringify(displayedData) !== JSON.stringify(displayedDataRef.current)) {
      displayedData.current = displayedData;
      props.setData(displayedData);
    }
  }, [props, displayedData, sortOptions, sort]);

  return (
    <Fragment>
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
            {
              props.useSort ?
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
                          <option value={JSON.stringify(sortOption)}>{sortOption.name}</option>
                        );
                      })
                    }
                  </NativeSelect>
                </FormControl>
                : null
            }
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
          <FilterMenu handleQuery={handleQuery} authors={props.authors} date={props.date} filters={props.filters} />
        </Collapse>
      </div>
      <br />
      {
        data.length && props.showSearchResultText > 0 ?
          (
            <Typography variant="body2"><b>Visar {displayedData.length} av {data.length} projekt</b></Typography>
          ) :
          (null)
      }
      <br />
      <Divider />
    </Fragment>
  );

};

export default Querybar;