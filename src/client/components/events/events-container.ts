import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_EVENTS } from '../../../server/ipc/ipc-events';
import { RootState } from '../../store';
import { Events, EventsActions, EventsProps } from './events';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): EventsProps => ({
    kek: 1,
});

const mapDispatchToProps = (dispatch: Dispatch): EventsActions => ({
    onEventCreate: () => {
        ipc.send(IPC_EVENTS.CREATE);
    },
});

export const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
