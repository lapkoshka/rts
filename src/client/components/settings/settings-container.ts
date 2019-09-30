import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { RaceParams } from '../../../server/controllers/race/controller';
import { IPC_RACE } from '../../../server/ipc/ipc-events';
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
import Settings, { SettingsProps } from './settings';

const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): Pick<SettingsProps,
        'mainReaderSettings' |
        'shouldShowPopup' |
        'applyRaceParams' |
        'raceParams'
    > => ({
    mainReaderSettings: state.readersControl.mainReaderSettings,
    shouldShowPopup: state.readersControl.shouldShowPopup,
    raceParams: state.raceInfo.raceParams,
    applyRaceParams: (params: RaceParams) => {
        ipc.send(IPC_RACE.UPDATE_RACE_PARAMS, params);
        Notification.success('Настройки гонки применены', 3000);
    },
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<SettingsProps,
        'showMainReaderSettings' |
        'setIpAddress' |
        'setIpAuto' |
        'setMainReaderParams' |
        'setDefaultMainReaderParams' |
        'setRaceParams'
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
