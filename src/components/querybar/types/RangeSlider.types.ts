export type RangeSliderTypes = {
    data: any;
    type?: string;
    name: string | Array<string>;
    handleFilter: ((query:any, type:string)=>void);
    useInputs?: boolean;
};