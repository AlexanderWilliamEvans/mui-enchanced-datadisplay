export type statisticsDataObject = {
    name: string | number;
    value: string | number | Array<string | number>;
    color?: string;
  };
  
  export type basicStatisticsTypes = {
    label?: string | number;
    data: Array<statisticsDataObject>;
  };

  export type pieCharTypes = {

  };
