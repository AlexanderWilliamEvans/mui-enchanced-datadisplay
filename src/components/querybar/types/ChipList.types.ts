export type ChipListTypes = {
    label?: string;
    type?: string;
    name: string | Array<string>;
    data: any;
    handleFilter: ((query:any, type:string)=>void);
};