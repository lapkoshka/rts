import React, { FC } from 'react';
import {
    ChartEnableInfo,
    RSSIChartTrace,
} from '../../../server/controllers/rssi-chart';
import { Block } from '../ui/block/block';
import chartXkcd from 'chart.xkcd';
import { XY } from 'chart.xkcd-react';
import './rssi-chart.scss';

export interface RSSIChartProps {
    trace: RSSIChartTrace;
    chartEnableInfo: ChartEnableInfo;
}

export const RSSIChart: FC<RSSIChartProps> = (props) => {
    const point = props.trace[props.trace.length - 1];
    const lastRSSIValue = point ? point.y : 0;
    return (
        <Block visible={props.chartEnableInfo.enable}>
            <div className='rssi-chart-current-value'>{lastRSSIValue}</div>
            <XY
                config={{
                    xLabel: 'time',
                    yLabel: 'rssi',
                    data: {
                        datasets: [{
                            label: props.chartEnableInfo.uid,
                            data: props.trace,
                        }],
                    },
                    options: {
                        legendPosition: chartXkcd.config.positionType.upRight,
                        showLine: true,
                        timeFormat: undefined,
                        dotSize: .2,
                        unxkcdify: true,
                    },
                }}
            />
        </Block>
    );
};
