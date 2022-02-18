import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Paper,
  IconButton,
  Avatar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

// const createData = (keys) => (
  
  
//   {
//   id: name.replace(" ", "_"),
//   isEditMode: false
// });

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const EditableTable = (props) => {
  const headers = props.headers || [];
  const [rows, setRows] = React.useState(props.data || []);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = (id) => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const testURL = (str) => {    
    const result = String(str).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return result !== null;
    };

  const createRow = (row) => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const onDelete = (index) => {
    if(index) {

    }
  };

  React.useEffect(() => {
    if (JSON.stringify(props.rows) !== JSON.stringify(rows)) {
      const newState = JSON.parse(JSON.stringify(props.rows))
      setRows(newState);
    }
  }, [rows, props.rows]);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            {
              headers.map((header) => {
                return  <TableCell align="left">{header}</TableCell>
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <React.Fragment>
                    <IconButton
                      color="primary"
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              {

              }
              {/* <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "calories", onChange }} />
              <CustomTableCell {...{ row, name: "fat", onChange }} />
              <CustomTableCell {...{ row, name: "carbs", onChange }} />
              <CustomTableCell {...{ row, name: "protein", onChange }} /> */}
              <TableCell>
                <IconButton>
                  <DeleteIcon
                  onClick={() => onDelete(index)}
                    color="primary"
                    aria-label="delete"
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default EditableTable;