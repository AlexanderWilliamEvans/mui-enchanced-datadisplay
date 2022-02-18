interface ChipListProps  {
    label?: string;
    type?: string;
    name: string | Array<string>;
    data: any;
    disabled?:boolean;
    hidden?: boolean;
};

export interface regularChipListProps extends ChipListProps {
    handleFilter: ((query:any, type:string)=>void);
};

export interface hierachialChipListProps extends ChipListProps {
    data: Array<ChipListProps>;
    gridSize?:number;
    handleFilter: (query:any, type:string)=>void;
    removeFilter: (filterkeys:Array<any>) => void;
};