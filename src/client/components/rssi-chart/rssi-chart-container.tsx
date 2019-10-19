import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../store';
import { setChartData } from '../../store/rssi-chart-store';
// import { getIpcRenderer } from '../../../common/ipc';
// import store, { RootState } from '../../store';

import RSSIChart, { RSSIChartProps } from './rssi-chart';
// const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): Pick<RSSIChartProps,
    'data'
> => ({
    data: state.rssiChart.data,
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<RSSIChartProps,
    'setData'
> => ({
    setData: (data) => dispatch(setChartData(data)),
});

// const { dispatch } = store;
// ipc.on(IPC_RESULTS.RACE_HISTORY_UPDATE, (_: Event, history: RaceHistory) =>
//     dispatch(setRaceHistory(history)));

export default connect(mapStateToProps, mapDispatchToProps)(RSSIChart);
