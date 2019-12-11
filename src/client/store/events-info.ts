import { EventData } from '../../server/view-data/events/events';
import { Action } from './index';

type EventsInfoAction = Action<EventData[]>;

const SET_EVENT_LIST = 'SET_EVENT_LIST';

export interface EventsInfoState {
    eventList: EventData[];
}

export const initialState: EventsInfoState = {
    eventList: [],
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
