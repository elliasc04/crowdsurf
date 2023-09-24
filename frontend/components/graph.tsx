import React, { PureComponent } from 'react';
import { Label, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface BarGraphProps{
    receivedData: any;
}

export default function BarGraph({receivedData}:BarGraphProps) {
    return (
        <BarChart
          width={600}
          height={400}
          data={receivedData}
          margin={{
            top: 5,
            right: 40,
            left: 0,
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
