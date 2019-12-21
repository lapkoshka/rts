import { EventData } from '../../server/view-data/events/events';
import { Action } from './index';

type EventsInfoAction = Action<EventData[]>;

const SET_EVENT_LIST = 'SET_EVENT_LIST';

export interface EventsInfoState {
    eventList: EventData[];
}

export const initialState: EventsInfoState = {
    eventList: [{
        id: 0,
        name: 'defaultStateStub',
        description: 'defaultStateStub',
        laps: 0,
        started_flag: 1,
        finished_flag: 1,
        start_time: 1,
        finish_time: 1,
    }],
};

export const setEventList = (payload: EventData[]) => ({
    type: SET_EVENT_LIST,
    payload,
});

export const eventsInfoReducer = (state = initialState, action: EventsInfoAction) => {
    switch (action.type) {
        case SET_EVENT_LIST:
            return {
                ...state,
                eventList: action.payload as EventData[],
            };
        default:
            return state;
    }
};
