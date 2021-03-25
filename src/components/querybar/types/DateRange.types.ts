export type DateRangeTypes = {
    data?: any;
    title?:string;
    type?: string;
    name: string | Array<string>;
   // values:{start:string, end:string};
    handleFilter: ((query:any, type:string)=>void);
};