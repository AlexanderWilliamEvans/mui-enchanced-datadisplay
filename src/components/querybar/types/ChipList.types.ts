export type ChipListTypes = {
    label?: string;
    type?: string;
    name: string;
    data: any;
    handleFilter: ((query:any, type:string)=>void);
};