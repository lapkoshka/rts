import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import {
    IPC_MAIN_READER,
    IPC_PORTABLE_READER,
} from '../../../server/ipc/ipc-events';
import { READER_STATUS } from '../../../server/lib/readers/base-reader';
import {
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import Notification from '../../lib/notification';
import ControlPanel, {
    ControlPanelProps,
} from './control-panel';
import { connect } from 'react-redux';
import {
    showMainReaderSettings,
    setMainReaderStatus,
    setPortableReaderStatus,
} from '../../store/control-panel-store';
import store, { RootState } from '../../store';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): Pick<ControlPanelProps,
        'mainStatus' |
        'portableStatus'|
        'mainReaderSettings' |
        'triggerMainReader' |
        'triggerPortableReader'
    > => ({
    mainStatus: state.readersControl.main.status,
    portableStatus: state.readersControl.portable.status,
    mainReaderSettings: state.readersControl.mainReaderSettings,
    triggerMainReader: (settings: MainReaderSettings) => {
        ipc.send(IPC_MAIN_READER.TRIGGER_CLICK, settings);
    },
    triggerPortableReader: () => {
        ipc.send(IPC_PORTABLE_READER.TRIGGER_CLICK);
    },
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<ControlPanelProps,
        'showMainReaderSettings'
    > => ({
    showMainReaderSettings: (enable: boolean) => dispatch(showMainReaderSettings(enable)),
});

const { dispatch } = store;
ipc.on(IPC_MAIN_READER.STATUS_CHANGE, (_: Event, status: READER_STATUS) => {
    dispatch(setMainReaderStatus(status));
});

ipc.on(IPC_MAIN_READER.ERROR, (_: Event, msg: string) => {
    Notification.error(msg, 5000);
});

ipc.on(IPC_MAIN_READER.DISCONNECT, (_: Event, msg: string) => {
    Notification.warn(msg, 2000);
});

ipc.on(IPC_MAIN_READER.IP_RECIEVED, (_: Event, ip: string) => {
    console.log(ip);
});

ipc.on(IPC_PORTABLE_READER.STATUS_CHANGE, (_: Event, status: READER_STATUS) => {
    dispatch(setPortableReaderStatus(status));
});

ipc.on(IPC_PORTABLE_READER.ERROR, (_: Event, msg: string) => {
    Notification.error(msg, 5000);
});

ipc.on(IPC_PORTABLE_READER.DISCONNECT, (_: Event, msg: string) => {
    Notification.warn(msg, 2000);
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
