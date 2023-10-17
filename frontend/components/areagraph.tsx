import { format } from 'path';
import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, Label} from 'recharts';

interface AreaGraphProps{
    receivedData: any;
}

function timeconvert(time: number) {
    if (time < 0 || time > 23) {
      return "Invalid input";
    }
  
    if (time === 0) {
      return "12 AM";
    } else if (time < 12) {
      return `${time} AM`;
    } else if (time === 12) {
      return "12 PM";
    } else {
      return `${time - 12} PM`;
    }
}

function CustomTooltip({active, payload, label}: any){
    if (active) {
        return (
            <div className="tooltip  min-h-[69px] min-w-[160px] bg-white border-[1px]">
                <h4 className="text-[#c6bed4] ml-[6px] mt-[5px]">{timeconvert(label)}:</h4>
                <h4 className="text-[#281c34] ml-[6px] mt-[14px]">{payload[0].value}% busy at this time.</h4>
            </div>
        )
    }
    return null;
}

export default function AreaGraph({receivedData}:AreaGraphProps) {
    return(
        <ResponsiveContainer width={575} height={400} className="ml-[-40px]">
            <AreaChart data={receivedData}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#281c34" stopOpacity={0.9}/>
                        <stop offset="75%" stopColor="#483464" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                <Area dataKey="UsualBusyness" fill="url(#color)" stroke="#281c34"/>
                <XAxis dataKey="name" 
                    tick={{fill: '#49565f'}}
                    tickLine={false}
                    
                    />
                <YAxis type = "number" 
                    domain = {[0,100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#49565f'}}
                    />
                {/* <Tooltip/> */}
                <Tooltip content={<CustomTooltip/>}/>
                <CartesianGrid opacity={0.4} vertical={false}/>
            </AreaChart>
        </ResponsiveContainer>
    );
}   