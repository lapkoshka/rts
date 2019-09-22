import {
    defaultMainReaderSettings, MainReaderParams,
    MainReaderSettings,
} from '../../server/lib/readers/main-reader';
import { Action } from './index';

type ReaderControlAction = Action<string | boolean | MainReaderParams | ReaderStatus>;
type ReaderStatus = 'disabled' | 'ok' | 'error' | 'wait';

export interface ReaderControlState {
    main: {
        status: ReaderStatus;
    };
    portable: {
        status: ReaderStatus;
    };
    mainReaderSettings: MainReaderSettings;
    shouldShowPopup: boolean;
}

export const setMainReaderStatus = (payload: ReaderStatus) => ({
  type: 'RECEIVE_MAIN_READER_STATUS',
  payload,
});

export const setPortableReaderStatus = (payload: ReaderStatus) => ({
  type: 'RECEIVE_PORTABLE_READER_STATUS',
  payload,
});

export const showMainReaderSettings = (payload: boolean) => ({
   type: 'SHOW_MAIN_READER_SETTINGS',
   payload,
});

export const setIpAdress = (payload: string) => ({
    type: 'SET_IP_ADDRESS',
    payload,
});

export const setIpAuto = (payload: boolean) => ({
    type: 'SET_IP_AUTO',
    payload,
});

export const setMainReaderParams = (payload: MainReaderParams) => ({
    type: 'SET_MAIN_READER_PARAMS',
    payload,
});

export const setDefaultMainReaderParams = () => ({
    type: 'SET_DEFAULT_MAIN_READER_PARAMS',
});

export const initialState = {
    main: {
        status: 'disabled' as ReaderStatus,
    },
    portable: {
        status: 'disabled' as ReaderStatus,
    },
    mainReaderSettings: defaultMainReaderSettings,
    shouldShowPopup: false,
};

export default (state = initialState, action: ReaderControlAction): ReaderControlState => {
  switch (action.type) {
    case 'RECEIVE_MAIN_READER_STATUS':
       return {
         ...state,
         main: {
           status: action.payload as ReaderStatus,
         },
       };
    case 'RECEIVE_PORTABLE_READER_STATUS':
       return {
         ...state,
         portable: {
           status: action.payload as ReaderStatus,
         },
       };
      case 'SHOW_MAIN_READER_SETTINGS':
        return {
            ...state,
            shouldShowPopup: action.payload as boolean,
        };
      case 'SET_IP_ADDRESS':
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  ip: {
                      ...state.mainReaderSettings.ip,
                      address: action.payload as string,
                  },
              },
          };
      case 'SET_IP_AUTO':
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  ip: {
                      ...state.mainReaderSettings.ip,
                      auto: action.payload as boolean,
                  },
              },
          };
      case 'SET_MAIN_READER_PARAMS':
          console.log(action.payload);
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  params: action.payload as MainReaderParams,
              },
          };
      case 'SET_DEFAULT_MAIN_READER_PARAMS':
          return {
              ...state,
              mainReaderSettings: defaultMainReaderSettings,
          };
    default:
      return state;
  }
};
