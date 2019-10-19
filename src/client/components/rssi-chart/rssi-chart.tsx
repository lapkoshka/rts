import React from 'react';
import Block from '../ui/block/block';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

export interface RSSIChartProps {
    data: any;
    setData: (data: any) => void;
}

const RSSIChart: React.FC<RSSIChartProps> = React.memo((props) => {
    setInterval(() => {
        const newData = [...props.data];
        newData.push({
            a: Math.random() * (80 - 1) + 1,
        });
        props.setData(newData);
    }, 1000);

    return (
        <Block>
            <LineChart width={500} height={300} data={props.data}>
                <XAxis dataKey='name'/>
                <YAxis/>
                <CartesianGrid stroke='#eee' strokeDasharray='5 5'/>
                <Line type='monotone' dataKey='a' stroke='#82ca9d' />
            </LineChart>
        </Block>
    );
});

export default RSSIChart;
