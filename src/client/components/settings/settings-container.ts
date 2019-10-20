import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { ChartEnableInfo } from '../../../server/controllers/rssi-chart/controller';
import { IPC_RACE, IPC_RSSI_CHART } from '../../../server/ipc/ipc-events';
import { RaceParams } from '../../../server/lib/domain/race';
import { MainReaderParams } from '../../../server/lib/readers/main-reader';
import { connect } from 'react-redux';
import Notification from '../../lib/notification';
import {
    showMainReaderSettings,
    setIpAddress,
    setIpAuto,
    setMainReaderParams,
    setDefaultMainReaderParams,
} from '../../store/control-panel-store';
import { RootState } from '../../store';
import { setRaceParams } from '../../store/race-info-store';
import { setChartEnableInfo } from '../../store/rssi-chart-store';
import Settings, { SettingsProps } from './settings';

const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): Pick<SettingsProps,
        'mainReaderSettings' |
        'shouldShowPopup' |
        'applyRaceParams' |
        'raceParams' |
        'users' |
        'chartEnableInfo'
    > => ({
    mainReaderSettings: state.readersControl.mainReaderSettings,
    shouldShowPopup: state.readersControl.shouldShowPopup,
    raceParams: state.raceInfo.raceParams,
    applyRaceParams: (params: RaceParams) => {
        ipc.send(IPC_RACE.UPDATE_RACE_PARAMS, params);
        Notification.success('Настройки гонки применены', 3000);
    },
    users: state.resultsInfo.users,
    chartEnableInfo: state.rssiChart.chartEnableInfo,
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<SettingsProps,
        'showMainReaderSettings' |
        'setIpAddress' |
        'setIpAuto' |
        'setMainReaderParams' |
        'setDefaultMainReaderParams' |
        'setRaceParams' |
        'setChartEnableInfo'
    > => ({
    showMainReaderSettings: (enable: boolean) => dispatch(showMainReaderSettings(enable)),
    setIpAddress: (address: string) => dispatch(setIpAddress(address)),
    setIpAuto: (enable: boolean) => {
        dispatch(setIpAuto(enable));
        if (enable) {
            dispatch(setIpAddress('0.0.0.0'));
        }
    },
    setMainReaderParams: (params: MainReaderParams) => dispatch(setMainReaderParams(params)),
    setDefaultMainReaderParams: () => dispatch(setDefaultMainReaderParams()),
    setRaceParams: (params: RaceParams) => dispatch(setRaceParams(params)),
    setChartEnableInfo: (info: ChartEnableInfo) => {
        ipc.send(IPC_RSSI_CHART.ENABLE, info);
        dispatch(setChartEnableInfo(info));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
