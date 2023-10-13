import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid,} from 'recharts';

interface AreaGraphProps{
    receivedData: any;
}

export default function AreaGraph({receivedData}:AreaGraphProps) {
    return(
        <ResponsiveContainer width = "100%" height={400}>
            <AreaChart data={receivedData}>
                <Area dataKey="value"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}   