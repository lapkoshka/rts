import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_EVENTS } from '../../../server/ipc/ipc-events';
import { EventData } from '../../../server/view-data/events/events';
import { RootState, store } from '../../store';
import { setEventList } from '../../store/events-info';
import { Events, EventsActions, EventsProps } from './events';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): EventsProps => ({
    list: state.eventsInfo.eventList,
});

const mapDispatchToProps = (dispatch: Dispatch): EventsActions => ({
    onEventCreate: () => {
        ipc.send(IPC_EVENTS.CREATE);
    },
});

const { dispatch } = store;
ipc.on(IPC_EVENTS.LIST, (_, list: EventData[]) => {
    dispatch(setEventList(list));
});


export const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
