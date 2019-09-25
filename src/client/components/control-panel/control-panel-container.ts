import { Dispatch } from 'redux';
import {
    getIpcRenderer,
    IPC_MAIN_READER,
    IPC_PORTABLE_READER,
} from '../../../common/ipc';
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
    triggerMainReader: (settings: MainReaderSettings) => {
        ipc.send(IPC_MAIN_READER.TRIGGER_CLICK, settings);
    },
    triggerPortableReader: () => {
        ipc.send(IPC_PORTABLE_READER.TRIGGER_CLICK);
    },
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
ipc.on(IPC_MAIN_READER.STATUS_CHANGE, (status: READER_STATUS) => {
    dispatch(setMainReaderStatus(status));
});

ipc.on(IPC_MAIN_READER.ERROR, (msg: string) => {
    Notification.error(msg);
});

ipc.on(IPC_MAIN_READER.IP_RECIEVED, (ip: string) => {
    console.log(ip);
});

ipc.on(IPC_PORTABLE_READER.STATUS_CHANGE, (status: READER_STATUS) => {
    dispatch(setPortableReaderStatus(status));
});

ipc.on(IPC_PORTABLE_READER.ERROR, (msg: string) => {
    Notification.error(msg);
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
