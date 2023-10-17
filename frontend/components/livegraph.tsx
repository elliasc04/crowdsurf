import React, { PureComponent } from 'react';
import { Label, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {clsx} from 'clsx';
import { AnyProcedure } from '@trpc/server';

interface BarGraphProps{
    receivedData: any;
}

const getIntroOfPage = (label: any) => {
    if (label === 'Live Busyness') {
      return "currently";
    }
    if (label === 'Usual Busyness') {
      return "usually";
    }
    return '';
};

function CustomTooltip1({active, payload, label}: any){
    if (active) {
        return (
            <div className="tooltip  min-h-[69px] min-w-[160px] bg-white border-[1px]">
                <h4 className="text-[#c6bed4] ml-[6px] mt-[5px]">{label}:</h4>
                <h4 className="text-[#281c34] ml-[6px] mt-[15px] mb-[5px]">At this time, it is {getIntroOfPage(label)} {payload[0].value}% busy.</h4>
            </div>
        )
    }
    return null;
}


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={clsx(
            "custom-tooltip",
            "group",
            "first:rounded-tl-lg last:rounded-tr-lg",
            "border-b first:border-r last:border-l",
            "border-gray-300 dark:border-gray-600",
            "bg-[#ffffff] ml-[10px] mt-[10px] mb-[10px]"
          )}>
          <p className="label text-center text-[#8884d8]">{`${label}`}</p>
          <p className="desc ml-[0px] text-center text-[#49565f]">At this time, it is {getIntroOfPage(label)} {payload[0].value}% busy.</p>
        </div>
      );
    }
  
    return null;
};

export default function LiveBarGraph({receivedData}:BarGraphProps) {
    return (
        <BarChart
          width={200}
          height={400}
          data={receivedData}
          margin={{
            top: 5,
            right: 40,
            left: 0,
            bottom: 5,
          }}
          className = "ml-[-35px] mr-[-30px]"
        >
            <XAxis dataKey="name" axisLine = {true} tick={false}/>
            <YAxis type = "number" domain = {[0,100]} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip1/>}/>
            <Bar dataKey="LiveBusyness" fill="#483464" />
        </BarChart>
    );
}
