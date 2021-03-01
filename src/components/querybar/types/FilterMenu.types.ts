import { IQueryObject } from "../interfaces/IQueryObject";
import { IQuerybar } from "./Querybar.types";

export interface FilterMenuTypes extends IQuerybar {
    handleQuery: ((data:Array<IQueryObject>, type:string)=>void);
};