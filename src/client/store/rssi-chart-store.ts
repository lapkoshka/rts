import {
    ChartEnableInfo,
    RSSIChartTrace,
} from '../../server/controllers/rssi-chart';
import { Action } from './index';

type RSSIChartStore = Action<RSSIChartTrace | ChartEnableInfo>;

export interface RSSIChartState {
    trace: RSSIChartTrace;
    chartEnableInfo: ChartEnableInfo;
}

const SET_CHART_DATA = 'rssi/SET_CHART_DATA';
const SET_CHART_ENABLE_INFO = 'rssi/SET_CHART_ENABLE_INFO';

export const setChartData = (payload: RSSIChartTrace) => ({
    type: SET_CHART_DATA,
    payload,
});

export const setChartEnableInfo = (payload: ChartEnableInfo) => ({
    type: SET_CHART_ENABLE_INFO,
    payload,
});

const initialState = {
    trace: [],
    chartEnableInfo: {
        enable: false,
        uid: '-',
    },
};

export const rssiChartReducer = (state = initialState, action: RSSIChartStore) => {
    switch (action.type) {
        case SET_CHART_DATA:
            return {
                ...state,
                trace: action.payload as RSSIChartTrace,
            };
        case SET_CHART_ENABLE_INFO:
            return {
                ...state,
                chartEnableInfo: action.payload as ChartEnableInfo,
            };
        default:
            return state;
    }
};
