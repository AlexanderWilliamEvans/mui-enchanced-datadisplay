import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  PaperProps,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Tooltip,
  IconButton,
  Avatar,
  TextField
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import Draggable from "react-draggable";
import functions from "../../functions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    table: {
      minWidth: 350,
    },
    avatar: {
      float: "right",
      margin: theme.spacing(1),
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    closeButton: {
      float: "right",
      padding: theme.spacing(2),
      margin: theme.spacing(1),
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

type detailProps = {
  data: Array<string | number>;
  title?: string | number;
  setOpen: (open: boolean) => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Details: React.FC <detailProps> = (props) => {
  const classes = useStyles();

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [values, setValues] = React.useState(Object.values(props.data) || []);
  const keys = Object.keys(props.data) || [];
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  React.useEffect(() => {

  }, [editMode]);

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        TransitionComponent={Zoom}
        transitionDuration={500}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title || "Details"}
          <Tooltip title="Close">
            <IconButton color="primary" aria-label="close detail dialog" component="span" className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <caption>A basic table example with a caption</caption>
              <TableBody>
                {values.map((value: any, i: number) => (
                  <TableRow key={`${keys[i]}-${value}-${i}`}>
                    <TableCell component="th" scope="row">
                      <b>{keys[i]}</b>
                    </TableCell>
                    <TableCell align="right">
                      {
                        editMode ?
                          (<TextField defaultValue={value} />) : (
                            <React.Fragment>
                              {!functions.isValidUrl(String(value)) ? value : <Avatar alt={value} src={value} className={classes.avatar} />}
                            </React.Fragment>
                          )
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          {
            editMode ? (
              <React.Fragment>
                <IconButton color="primary" onClick={() => handleEdit()}>
                  <DoneIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleEdit()}>
                  <SaveIcon />
                </IconButton>
              </React.Fragment>
            ) : (
              <IconButton color="primary" onClick={() => handleEdit()}>
                <EditIcon />
              </IconButton>
            )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Details;