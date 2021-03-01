import RadioButtonGroup from "../Filter/components/RadioButtonGroup/RadioButtonGroup";

export type RadioButtonGroupTypes = {
label?: string;
type?: string;
data: any;
name: string;
handleFilter: ((query:any, type:string)=>void);
};