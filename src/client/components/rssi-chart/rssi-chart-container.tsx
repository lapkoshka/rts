import { connect } from 'react-redux';
import { getIpcRenderer } from '../../../common/ipc';
import { RSSIChartTrace } from '../../../server/controllers/rssi-chart/controller';
import { IPC_RSSI_CHART } from '../../../server/ipc/ipc-events';
import { setChartData } from '../../store/rssi-chart-store';
import store, { RootState } from '../../store';

import RSSIChart, { RSSIChartProps } from './rssi-chart';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RSSIChartProps => ({
    trace: state.rssiChart.trace,
    chartEnableInfo: state.rssiChart.chartEnableInfo,
});

const { dispatch } = store;
ipc.on(IPC_RSSI_CHART.DATA, (_: Event, trace: RSSIChartTrace) =>
    dispatch(setChartData(trace)));

export default connect(mapStateToProps)(RSSIChart);
