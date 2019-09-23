import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { READER_STATUS } from '../../../server/lib/readers/base-reader';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import Notification from '../../lib/notification';
import ControlPanel, {
    ControlPanelActions,
    ControlPanelProps,
} from './control-panel';
import { connect } from 'react-redux';
import {
    showMainReaderSettings,
    setMainReaderStatus,
    setPortableReaderStatus,
    setIpAdress,
    setIpAuto,
    setMainReaderParams,
    setDefaultMainReaderParams,
} from '../../store/control-panel-store';
import store, { RootState } from '../../store';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): ControlPanelProps => ({
    mainStatus: state.readersControl.main.status,
    portableStatus: state.readersControl.portable.status,
    mainReaderSettings: state.readersControl.mainReaderSettings,
    shouldShowPopup: state.readersControl.shouldShowPopup,
    triggerMainReader: (settings: MainReaderSettings) => ipc.send('mainReaderTriggerClick', settings),
    triggerPortableReader: () => ipc.send('portableReaderTriggerClick'),
});

const mapDispatchToProps = (dispatch: Dispatch): ControlPanelActions => ({
    showMainReaderSettings: (enable: boolean) => dispatch(showMainReaderSettings(enable)),
    setIpAddress: (address: string) => dispatch(setIpAdress(address)),
    setIpAuto: (enable: boolean) => {
        dispatch(setIpAuto(enable));
        if (enable) {
            dispatch(setIpAdress('0.0.0.0'));
        }
    },
    setMainReaderParams: (params: MainReaderParams) => dispatch(setMainReaderParams(params)),
    setDefaultMainReaderParams: () => dispatch(setDefaultMainReaderParams()),
});

const { dispatch } = store;
ipc.on('onPortableReaderConnectingStart', () =>
    dispatch(setPortableReaderStatus(READER_STATUS.WAIT)));

ipc.on('onPortableReaderConnected', () =>
    dispatch(setPortableReaderStatus(READER_STATUS.OK)));

ipc.on('onPortableReaderConnectingFailed', (_: Event, msg: string) => {
    dispatch(setPortableReaderStatus(READER_STATUS.ERROR));
    Notification.error(msg);
});

ipc.on('onPortableReaderDisconnected', () =>
    dispatch(setPortableReaderStatus(READER_STATUS.DISABLED)));

ipc.on('onMainReaderConnectingStart', () =>
    dispatch(setMainReaderStatus(READER_STATUS.WAIT)));

ipc.on('onMainReaderConnected', () =>
    dispatch(setMainReaderStatus(READER_STATUS.OK)));

ipc.on('onMainReaderConnectingFailed', (_: Event, msg: string) => {
    dispatch(setMainReaderStatus(READER_STATUS.ERROR));
    console.log(msg);
    Notification.error(msg);
});

ipc.on('onMainReaderDisconnected', () =>
    dispatch(setMainReaderStatus(READER_STATUS.DISABLED)));

ipc.on('onMainReaderIpReceived', (_: Event, msg: string) =>
    console.log(msg));

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
