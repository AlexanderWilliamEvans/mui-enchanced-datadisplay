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

type basicTableProps = {
  rows: Array<any>;
  setRows?: (rows:Array<any>) => void;
  title: string;
  headers: any;
  editable?: boolean;
  showDetails: (row:any, title?: string) => void;
};

const BasicTable:React.FC<basicTableProps> = (props) => {
  const classes = useStyles();
  const headers = props.headers || [];
  const [rows, setRows] = useState(props.rows || []);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const title = props.title;
  const [details, showDetails] = React.useState(false);

 /* const testImage = (url:string, timeoutT:number) => {
    return new Promise(function (resolve, reject) {
      const timeout = timeoutT || 5000;
      const timer, img = new Image();
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
  }*/

  const isValidHttpUrl = (string:string) => {
    let url;

    try {
      url = new URL(string);
      return true;
    } catch (e) {
      return false;
    }

  };

  const testURL = (str:string) => {    
  const result = String(str).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return result !== null;
  };



  const createRow = (row:any)=> {
    return (
      <Fragment>
        {
          Object.keys(row).map((key, index) => {
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
  React.useEffect(() => {

  }, []);

  useEffect(() => {
    if (JSON.stringify(props.rows) !== JSON.stringify(rows)) {
      const newState = JSON.parse(JSON.stringify(props.rows))
      setRows(newState);
    }
  }, [props.rows, rows]);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                headers.map((header:string, index:number) => {
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
            {rows.map((row:any) => (
              <TableRow key={JSON.stringify(row)} onClick={() => props.showDetails(row, row.title)} className={classes.tableRow}>
                {
                  createRow(row)
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default BasicTable;