import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
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
} from '../../store/reader-control-actions';
import store, { RootState } from '../../store';
import { message } from 'antd';
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
  dispatch(setPortableReaderStatus('wait')));

ipc.on('onPortableReaderConnected', () =>
  dispatch(setPortableReaderStatus('ok')));

ipc.on('onPortableReaderConnectingFailed', (_: Event, msg: string) => {
  dispatch(setPortableReaderStatus('error'));
  message.error(msg);
});

ipc.on('onPortableReaderDisconnected', () =>
  dispatch(setPortableReaderStatus('disabled')));

ipc.on('onMainReaderConnectingStart', () =>
  dispatch(setMainReaderStatus('wait')));

ipc.on('onMainReaderConnected', () =>
  dispatch(setMainReaderStatus('ok')));

ipc.on('onMainReaderConnectingFailed', (_: Event, msg: string) => {
    dispatch(setMainReaderStatus('error'));
    message.error(msg);
});

ipc.on('onMainReaderDisconnected', () =>
  dispatch(setMainReaderStatus('disabled')));

ipc.on('onMainReaderIpReceived', (_: Event, msg: string) =>
   console.log(msg));

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
