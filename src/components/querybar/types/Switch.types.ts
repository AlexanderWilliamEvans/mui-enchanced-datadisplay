export type SwitchTypes = {
    value: any;
    name: string | Array<string>;
    handleFilter: ((query:any, type:string)=>void);
};
