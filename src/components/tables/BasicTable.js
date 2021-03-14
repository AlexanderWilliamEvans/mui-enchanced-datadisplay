import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
    minWidth: 650,
  },
});

export const BasicTable = (props) => {
  const classes = useStyles();
  const headers = props.headers || [];
  const [rows, setRows] = useState(props.rows || []);


  const createRow = (row) => {
    return (
      <Fragment>
        {
          Object.keys(row).map((key, index) => {
            if (index === 0) {
              return (
                <TableCell component="th" scope="row">
                  {row[key]}
                  </TableCell>
              );
            }
            else {
              return (
                <TableCell align="right">
                  {row[key]}
                  </TableCell>
              );
            }
          })
        }
      </Fragment>
    );
  };
  
  useEffect( () => {
    if(JSON.stringify(props.rows) !== JSON.stringify(rows)) {
      const newState = JSON.parse(JSON.stringify(props.rows))
      setRows(newState);
    }
  }, [props.rows, rows]);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
             headers.map((header, index) => {
              if(index === 0) {
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
            <TableRow key={JSON.stringify(row)}>
              {
                createRow(row)
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;