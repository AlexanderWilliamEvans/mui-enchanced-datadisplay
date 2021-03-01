
enum sortOrder {
    asc = "asc",
    desc = "desc",
};

enum sortType {
    string = "string",
    int= "int",
    date= "date",
};

enum filterType {
    radio = "radio",
    range = "range",
    dateRange = "dateRange",
    chip = "chip",
    switch = "switch",
};


interface filterObject {
    name: string;
    label: string;
    width?: 12 | 6 | 3; 
    type: /*filterType*/string;
    data: any;
};

interface sortObject {
    name: string;
    key: string;
    order: string;
    type: string;
};
//name: string; key: string; order: string; type: string;

interface headerObject {
    headerName: string | number,
    field: string | number;
};

interface dateObject {
    start: Date,
    end: Date
};



export interface IQuerybar {
    authors?:Array<string>;
    date?:dateObject;
    filters: Array<filterObject>;
}
export interface QuerybarTypes extends IQuerybar{
    data: Array<any>;
    filename?:string;
    readonly headers?: Array<headerObject>;
    sort?: Array<sortObject>;
    handleDelete:(()=>void);
    setData:((filters:Array<any>)=>void);
    updateData: ((data:Array<any>)=>void);
    showDelete: boolean;
    readonly placeholder?: string;
    useSort?: boolean; 
    showSearchResultText?:boolean;
};
