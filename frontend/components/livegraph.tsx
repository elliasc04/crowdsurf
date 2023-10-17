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

function CustomTooltipEmpty({active, payload, label}: any){
        return (
            <div className="tooltip  min-h-[69px] min-w-[160px] bg-white border-[1px]">
                <h4 className="text-[#c6bed4] ml-[6px] mt-[5px]">Sorry,</h4>
                <h4 className="text-[#281c34] ml-[6px] mt-[15px] mb-[5px]">There is no live data. Maybe it's closed?</h4>
            </div>
        )
}

function CustomTooltip({active, payload, label}: any){
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



export default function LiveBarGraph({receivedData}:BarGraphProps) {
    if (JSON.stringify(receivedData) == JSON.stringify([{"name":"Live Busyness"},{"name":"Usual Busyness"}])){
      return(
        <div className ="min-w-[160px] max-w-[160px] min-h-[400px] max-h-[400px] items-center justify-center">
            <p className="text-[#c6bed4] text-center mt-[50px]">
              Sorry,
            </p>
            <p className="text-[#281c34] text-center mt-[75px]">
              There's no live data. Maybe it's closed?
            </p>
        </div>
      );
    } else {
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
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="LiveBusyness" fill="#483464" />
          </BarChart> 
      );
    }
}
