import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  IconButton, AppBar, Typography, InputBase, Toolbar, Tooltip, Collapse,
  FormControl, NativeSelect, InputLabel,
} from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import FilterMenu from './Filter/FilterMenu';
import ButtonPanel from './ButtonPanel/ButtonPanel';
import { QuerybarTypes } from './types/Querybar.types';
import { IQueryObject } from './interfaces/IQueryObject';


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

const BootstrapInput = withStyles((theme:Theme) => createStyles({

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

/**
     * Summary: A querybar for search, filter and CRUD-operations in a given data.
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
     * @alias    realName
     * @memberof namespace
     *
     * @see   Function/class relied on
     * @link  URL
     * @fires Class#eventName
     *
     * @param {Object} attributes     The model's attributes.
     * @param {type}   attributes.key One of the model's attributes.
     * @param {Object} [options]      The model's options.
     * @param {type}   attributes.key One of the model's options.
     */

const Querybar = (props:QuerybarTypes) => {

  const classes = useStyles();
  const data = props.data || [];
  const headers = props.headers || null;
  const showSearchResultText = props.showSearchResultText || false;
  const [displayedData, setDisplayedData] = useState(props.data || []);
  const displayedDataRef = useRef<any[]>([]);
  const [dataQuery, setDataQuery] = useState([]);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState('sortera');
  const sortOptions = props.sort || [];
  const [search, setSearch] = useState('');
  const [collapseFilter, setCollapseFilter] = useState(false);

  const handleQuery = (e:any, type:string) => {
    const query = e.target !== undefined ? e.target.value : e;
    let test = JSON.parse(JSON.stringify(data));
    if (data.length > 0) {
      if (type === 'sort' || sort.length > 0) {
        test = handleSort(type === 'sort' ? JSON.parse(query) : sort, test);
      }

      if (type === 'filter' || filter.length > 0) {
        if (type === 'filter') {
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
        test = handleSearch(type === 'search' ? query : search, test);
      }
      setDataQuery(test);
      setDisplayedData(test);
    }

  };

  const handleSort = (param:any, data:Array<any>) => {
    let result;
    if (data[0].hasOwnProperty(param.key)) {
      switch (param.type.toLowerCase()) {
        case 'string':
          result = data.sort((a:any, b:any) => {
            return a[param.key].localeCompare(b[param.key], 'sv', { ignorePunctuation: true })
          });
          result = param.order.toLowerCase() === 'asc' ? result : result.reverse();
          setSort(param);
          return result;
        case 'int':
          result = data.sort((a:any, b:any) => {
            return a[param.key] - b[param.key];
          });
          result = param.order.toLowerCase() === 'asc' ? result : result.reverse();
          setSort(param);
          return result;
        case 'date':
          result = data.sort((a:any, b:any) => {
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

  const deepSearch = (data:any, param: string, keys:any) => {
    const result = data.filter((d:any) => {
      let t = d;
        if(Array.isArray(keys)) {
      	for(let i = 0; i<keys.length; i++) {
        if(t === undefined) {
        console.error("Invalid key for filter object!");
        	break;
        }
  			else {
        	t = t[keys[i]];
        }
        }
          return t !== undefined ? t.toString().toLowerCase() === param.toString().toLowerCase() : null;
      }
    else {
    console.log(t[keys].toString().toLowerCase());
		return t[keys].toString().toLowerCase() === param.toString().toLowerCase();
    }
  }
      );
      return result;
  };
  const handleFilter = (param:any, data:IQueryObject) => {
    let result;
    // if (data[0].hasOwnProperty(param.name)) {
    switch (param.type) {
      case 'radio':
        if (param.filter === 'all') {
          result = data;
        }
        else {
          result = data.filter((item:any) => {
            // If item[param.name] is undefined or null it will throws an error!
            if (item[param.name] !== undefined && item[param.name] !== null) {
              return item[param.name].toString().toLowerCase() === param.filter.toString().toLowerCase();
            } else {
              return false;
            }
          });
        }
        return result;
      case 'list':
        switch (param.name) {
          case 'form_categories':
            result = param.filter.length < 1 ? data : data.filter((d:any, i:number) => {
              for (let i = 0; i < d.form_categories.length; i++) {
                return param.filter.indexOf(d.form_categories[i].name) !== -1;
              }
            });
            break;
          case 'projects':
            result = param.filter.length < 1 ? data : data.filter((d:any) => {
              if (d.project !== undefined) {
                return param.filter.indexOf(d.project.title) !== -1;
              } else {
                return false;
              }
            });
            break;
          default:
            result = data.filter((d:any) => {
              if (Array.isArray(d[param.name])) {
                return d[param.name].some((item:any) => param.filter.includes(item));
              }
              else {
                return param.filter.includes(d[param.name]);
              }
            });
            break;
        }
        return result;
      case 'switch':
        if (param.filter.checked) {
          result = data.filter((item:any) => {
            return item[param.name] === param.filter.value;
          });
          return result;
        }
        else {
          return data;
        }
      case 'range':
        result = data.filter((item:any) => {
          return item[param.name] <= param.filter.end && item[param.name] >= param.filter.start;
        });
        return result;
      default:
        return data;
    }
    // }
    //  return data;
  };

  const handleSearch = (param:string | number, data:any) => {
    let result;
    const searchString = param.toString().toLowerCase().trim();
    if (searchString !== "") {
      result = data.filter((obj:any) => {
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

  const exportData = () => {
    if(headers !== null) {
      const firstRow = headers.map(header => header.headerName);
      const rows = [];
      rows.push(firstRow);
      for (const [key, value] of Object.entries(displayedData)) {
        let res: any[] = [];
        headers.map(header => {
          if (value.hasOwnProperty(header.field)) {
            res.push(value[header.field] !== null ? value[header.field].toString().replace(/(\r\n|\n|\r)/gm, "") : " ");
          }
        });
        rows.push(res);
      }
  
      const fName = `${props.filename || 'data'}.csv`;
      let csv = '';
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.length; j++) {
          let val = row[j] === null ? '' : row[j].toString();
          val = val.replace(/\t/gi, " ");
          if (j > 0)
            csv += ';';
          csv += val;
        }
        csv += '\n';
      }
      // for UTF-16
      let cCode, bArr = [];
      bArr.push(255, 254);
      for (let i = 0; i < csv.length; ++i) {
        cCode = csv.charCodeAt(i);
        bArr.push(cCode & 0xff);
        bArr.push(cCode / 256 >>> 0);
      }
      const blob = new Blob([new Uint8Array(bArr)], { type: 'text/csv;charset=UTF-16LE;' });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fName);
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          const url = window.URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", fName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // Timeout is needed for large datasets.
          setTimeout(function () {
            window.URL.revokeObjectURL(url);
          }, 0);
        }
      }
    }
  };




  useEffect(() => {
    if (JSON.stringify(displayedData) !== JSON.stringify(displayedDataRef.current)) {
      displayedDataRef.current = displayedData;
      setDisplayedData(displayedData);
      props.setData(displayedData);
    }
  }, [sortOptions, sort, displayedData, props]);

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
                    onChange={(e) => handleQuery(e, "sort")}
                    input={<BootstrapInput />}
                  >
                    {
                      sortOptions.map((sortOption, i) => {
                        return (
                          <option key={`${sortOption.name}-${i}`} value={JSON.stringify(sortOption)}>{sortOption.name}</option>
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
      <ButtonPanel
        exportData={exportData}
        headers={headers}
        updateData={props.updateData}
        showDelete={props.showDelete}
        handleDelete={props.handleDelete}
      />
      <br />
      {
        showSearchResultText && data.length > 0 ?
          (
            <Typography variant="body2"><b>Visar {displayedData.length} av {data.length} projekt</b></Typography>
          ) :
          (null)
      }
      <br />
    </Fragment>
  );

};

export default Querybar;