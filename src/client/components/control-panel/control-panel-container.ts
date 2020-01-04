import { Dispatch } from 'redux';
import { Ipc } from '../../../common/ipc';
import {
    IPC_MAIN_READER,
    IPC_PORTABLE_READER,
} from '../../../server/ipc/ipc-events';
import { READER_STATUS } from '../../../server/lib/readers/base-reader';
import {
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import { Notification } from '../../lib/notification';
import { ControlPanel, ControlPanelActions, ControlPanelProps } from './control-panel';
import { connect } from 'react-redux';
import {
    showMainReaderSettings,
    setMainReaderStatus,
    setPortableReaderStatus,
} from '../../store/control-panel-store';
import { store, RootState } from '../../store';

const mapStateToProps = (state: RootState): ControlPanelProps => ({
    mainStatus: state.readersControl.main.status,
    portableStatus: state.readersControl.portable.status,
    mainReaderSettings: state.readersControl.mainReaderSettings,
    triggerMainReader: (settings: MainReaderSettings) => {
        Ipc.send(IPC_MAIN_READER.TRIGGER_CLICK, settings);
    },
    triggerPortableReader: () => {
        Ipc.send(IPC_PORTABLE_READER.TRIGGER_CLICK);
    },
});

const mapDispatchToProps = (dispatch: Dispatch): ControlPanelActions => ({
    showMainReaderSettings: (enable: boolean) => dispatch(showMainReaderSettings(enable)),
});

const { dispatch } = store;
Ipc.on<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, (status) => {
    dispatch(setMainReaderStatus(status));
});

Ipc.on<string>(IPC_MAIN_READER.ERROR, (msg) => {
    Notification.error(msg, 5000);
});

Ipc.on<string>(IPC_MAIN_READER.DISCONNECT, (msg) => {
    Notification.warn(msg, 2000);
});

Ipc.on<string>(IPC_MAIN_READER.IP_RECIEVED, (ip) => {
    console.log(ip);
});

Ipc.on<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, (status) => {
    dispatch(setPortableReaderStatus(status));
});

Ipc.on<string>(IPC_PORTABLE_READER.ERROR, (msg) => {
    Notification.error(msg, 5000);
});

Ipc.on<string>(IPC_PORTABLE_READER.DISCONNECT, (msg) => {
    Notification.warn(msg, 2000);
});

export const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
