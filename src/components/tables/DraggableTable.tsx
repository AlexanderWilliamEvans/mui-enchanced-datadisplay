import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import {
  makeStyles,
  Theme,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ReorderIcon from "@material-ui/icons/Reorder";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Row from "./assets/Row";

export interface DataItem {
  uuid: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

/* 
Note: this is a working example, but more can be done to improve it.

In particular, on drag, the table cells in the dragged row may collapse and shrink the overall row.

If you wish to preserve their size mid-drag, you can create a custom component that wraps
the material TableCell and saves the pre-drag dimensions (e.g. in a ref or in state).
The component can be passed an 'isDragging' prop (via snapshot.isDragging) and can conditionally
apply pre-drag width/height via styles.

Pre-drag dimensions can be obtained via the new-ish ResizeObserver API. If you are using class 
components, the getSnapshotBeforeUpdate() lifecycle method can work with getBoundingClientRect(), 
*/

type draggableTableProps = {
  rows: Array<any>;
  setRows?: (rows:Array<any>) => void;
  title: string;
  headers: any;
  editable?: boolean;
  showDetails: (row:any, title?: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
showIcon: {
  color: "green",
}
  }),
);

const DraggableTable: React.FC<draggableTableProps> = (props) => {

  const classes = useStyles();
  // cache the items provided via props in state for purposes of this demo
  const tableData: Array<DataItem> = [
    { uuid: "1", description: "Item #1", unitPrice: 11.11, quantity: 1 },
    { uuid: "2", description: "Item #2", unitPrice: 22.22, quantity: 2 },
    { uuid: "3", description: "Item #3", unitPrice: 33.33, quantity: 3 },
    { uuid: "4", description: "Item #4", unitPrice: 44.44, quantity: 4 },
    { uuid: "5", description: "Item #5", unitPrice: 55.55, quantity: 5 }
  ];
  const [localItems, setLocalItems] = useState<Array<DataItem>>(tableData);

  // normally one would commit/save any order changes via an api call here...
  const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setLocalItems((prev: any) => {
      const temp = [...prev];
      const d = temp[result.destination!.index];
      temp[result.destination!.index] = temp[result.source.index];
      temp[result.source.index] = d;

      return temp;
    });
  };

  return (
    <TableContainer>
      <Table>
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "35%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left">&nbsp;</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Unit Cost</TableCell>
            <TableCell align="right">Qty/Rate</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(droppableProvided: DroppableProvided) => (
              <TableBody
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {localItems.map((item: DataItem, index: number) => (
                  <Draggable
                    key={item.uuid}
                    draggableId={item.uuid}
                    index={index}
                  >
                    {(
                      draggableProvided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => {
                      return (
                        <TableRow
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          style={{
                            ...draggableProvided.draggableProps.style,
                            background: snapshot.isDragging
                              ? "rgba(245,245,245, 0.75)"
                              : "none"
                          }}
                        >
                          {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
                          <TableCell align="left">
                            <ButtonGroup>
                             <div {...draggableProvided.dragHandleProps}>
                                <Tooltip title="Dra">
                                <ReorderIcon color="primary" />
                                </Tooltip>
                              </div>
                              <Tooltip title="redigera">
                                <IconButton color="primary">
                                <EditIcon onClick={() => console.log("edit")} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Visa">
                                <IconButton className={classes.showIcon}>
                                <VisibilityIcon onClick={() => console.log("show")} />
                                </IconButton>
                              </Tooltip>          
                              <Tooltip title="redigera">
                                <IconButton color="secondary">
                                <DeleteIcon onClick={() => console.log("delete")} />
                                </IconButton>
                              </Tooltip>                                 
                            </ButtonGroup>
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell align="right">{item.unitPrice}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {(item.unitPrice * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    }}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  );
};
export default DraggableTable;