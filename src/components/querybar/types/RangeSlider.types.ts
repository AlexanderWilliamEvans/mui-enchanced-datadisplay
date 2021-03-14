export type RangeSliderTypes = {
    data: any;
    type?: string;
    name: string;
    handleFilter: ((query:any, type:string)=>void);
    useInputs?: boolean,
};