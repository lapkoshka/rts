import { connect } from 'react-redux';
import { Ipc } from '../../../common/ipc';
import { RSSIChartTrace } from '../../../server/controllers/rssi-chart/controller';
import { IPC_RSSI_CHART } from '../../../server/ipc/ipc-events';
import { setChartData } from '../../store/rssi-chart-store';
import { store, RootState } from '../../store';

import { RSSIChart, RSSIChartProps } from './rssi-chart';

const mapStateToProps = (state: RootState): RSSIChartProps => ({
    trace: state.rssiChart.trace,
    chartEnableInfo: state.rssiChart.chartEnableInfo,
});

const { dispatch } = store;
Ipc.on<RSSIChartTrace>(IPC_RSSI_CHART.DATA, (trace) =>
    dispatch(setChartData(trace)));

export const RSSIChartContainer = connect(mapStateToProps)(RSSIChart);
