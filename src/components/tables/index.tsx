import React from "react";
import Details from "./assets/Dialogs/Details";
import BasicTable from "./BasicTable";
import DraggableTable from "./DraggableTable";

enum tableTypes {
    basic = "basic",
    draggable = "draggable",
    mail = "mail",
};
type tableProps = {
    data: Array<any>;
    headers: Array<string>;
    type?: tableTypes;
    title?: string;
    updateData?: (data:Array<any>)=>void;
};

const Table: React.FC<tableProps> = (props) => {

    const [data, setData] = React.useState<any[]>(props.data || []);
    const [selectedRow, setSelectedRow] = React.useState<any>({});
    const title = props.title || "";
    const [details, showDetails] = React.useState<boolean>(false);

    const handleDetails = (row: any, title?: string) => {
        if(title) {
            row.title = title;
        }
        setSelectedRow(row);
        showDetails(true);
      };
  
      const setTable = () => {
        switch(props.type) {
            case tableTypes.basic:
                return  <BasicTable
                title={props.title || "Table"}
                headers={props.headers}
                rows={props.data}
                showDetails={handleDetails}
                setRows={setData} />;
            case tableTypes.draggable:
                return  <DraggableTable
                title={props.title || "Table"}
                headers={props.headers}
                rows={props.data}
                showDetails={handleDetails}
                setRows={setData} />;
            case tableTypes.mail:
                return  <BasicTable
                title={props.title || "Table"}
                headers={props.headers}
                rows={props.data}
                showDetails={handleDetails}
                setRows={setData} />;
            default:
                return  <BasicTable
                title={props.title || "Table"}
                headers={props.headers}
                rows={props.data}
                showDetails={handleDetails}
                setRows={setData} />;
        }
      };

      React.useEffect(() => {

      }, [props, details]);

    return (
        <React.Fragment>
            {
               setTable()
            }
              {
        details && selectedRow !== null ?
          (<Details
            title={selectedRow.title ? selectedRow.title : "" }
            data={selectedRow}
            setOpen={showDetails}
          />)
          : (null)
      }
        </React.Fragment>
    );
};
export default Table;