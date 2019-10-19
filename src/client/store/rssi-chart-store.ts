import { Action } from './index';

type RSSIChartStore = Action<any>;

export interface RSSIChartState {
    data: any[];
}

export const setChartData = (payload: any[]) => ({
    type: 'SET_CHART_DATA',
    payload,
});

const initialState = {
    data: [],
};

export default (state = initialState, action: RSSIChartStore) => {
    switch (action.type) {
        case 'SET_CHART_DATA':
            return {
                ...state,
                data: action.payload as any,
            };
        default:
            return state;
    }
};
