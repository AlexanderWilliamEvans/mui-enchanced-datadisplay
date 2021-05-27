import React, { useState, useEffect, Fragment } from 'react';
import { 
  makeStyles,
  Theme, 
  Table, 
  TableBody,
   TableCell, 
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Avatar,
  } from '@material-ui/core';
import Details from "./assets/Dialogs/Details";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    "&:hover, &:focus": {
      backgroundColor: "#ccc",
      color: "#ffff",
      cursor: "pointer"
    },
  }
});

export const BasicTable = (props) => {
  const classes = useStyles();
  const headers = props.headers || [];
  const [rows, setRows] = useState(props.rows || []);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const title = props.title;
  const [details, showDetails] = React.useState(false);

  const testImage = (url, timeoutT) => {
    return new Promise(function (resolve, reject) {
      var timeout = timeoutT || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject("error");
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve("success");
      };
      timer = setTimeout(function () {
        // reset .src to invalid URL so it stops previous
        // loading, but doens't trigger new load
        img.src = "//!!!!/noexist.jpg";
        reject("timeout");
      }, timeout);
      img.src = url;
    });
  }

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
      return true;
    } catch (e) {
      return false;
    }

  };

  const testURL = (str) => {    
  const result = String(str).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return result !== null;
  };



  const createRow = (row) => {
    return (
      <Fragment>
        {
          Object.keys(row).map((key, index) => {
            console.log(key);
            const isUrl = testURL(row[key]);
            debugger;
            if (index === 0) {
              return (
                <TableCell component="th" scope="row" key={index}>
                  {!isUrl ? row[key] : <Avatar alt="Remy Sharp" src={row[key]} />}
                </TableCell>
              );
            }
            else {
              return (
                <TableCell align="right" key={index}>
                  {!isUrl ? row[key] : <Avatar alt="Remy Sharp" src={row[key]} />}
                </TableCell>
              );
            }
          })
        }
      </Fragment>
    );
  };
  const handleDetails = (row: any) => {
    debugger;
    setSelectedRow(row);
    showDetails(true);
  };

  useEffect(() => {
    if (JSON.stringify(props.rows) !== JSON.stringify(rows)) {
      const newState = JSON.parse(JSON.stringify(props.rows))
      setRows(newState);
    }
  }, [props.rows, rows]);

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                headers.map((header, index) => {
                  if (index === 0) {
                    return (
                      <TableCell>
                        {header}
                      </TableCell>
                    );
                  }
                  else {
                    return (
                      <TableCell align="right">
                        {header}
                      </TableCell>
                    );
                  }
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={JSON.stringify(row)} onClick={() => handleDetails(row)} className={classes.tableRow}>
                {
                  createRow(row)
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        details ?
          (<Details
            title={selectedRow[title]}
            data={selectedRow}
            setOpen={showDetails}
          />)
          : (null)
      }
    </React.Fragment>
  );
};

export default BasicTable;