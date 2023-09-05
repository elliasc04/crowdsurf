import React, { PureComponent } from 'react';
import { Label, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface BarGraphProps{
    receivedData: any;
}

export default function BarGraph({receivedData}:BarGraphProps) {
    return (
        <BarChart
          width={1000}
          height={400}
          data={receivedData}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
            <XAxis dataKey="name" />
            <YAxis type = "number" domain = {[0,100]}>
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="UsualBusyness" fill="#8884d8" />
        </BarChart>
    );
}
