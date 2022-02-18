import { Divider, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { basicStatisticsTypes } from "../../types/types";


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const BasicPieChart = (props: basicStatisticsTypes) => {

  const [ data, setData ] = React.useState<any>(props.data || []);
  debugger;
  return (
    <React.Fragment>
      <Typography variant="h5">{props.label || ""}</Typography>
      <Divider />
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry:any, index:number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </React.Fragment>
  );
};
export default BasicPieChart;