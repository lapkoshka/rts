export const setMainReaderStatus = status => ({
  type: 'RECEIVE_MAIN_READER_STATUS',
  status,
});

export const setPortableReaderStatus = status => ({
  type: 'RECEIVE_PORTABLE_READER_STATUS',
  status,
});

export const showMainReaderSettings = enable => ({
   type: 'SHOW_MAIN_READER_SETTINGS',
   enable,
});

export const setIpAdress = address => ({
    type: 'SET_IP_ADDRESS',
    address,
});

export const setIpAuto = enable => ({
    type: 'SET_IP_AUTO',
    enable,
});

export const setMainReaderParams = params => ({
    type: 'SET_MAIN_READER_PARAMS',
    params,
});

export const setDefaultMainReaderParams = () => ({
    type: 'SET_DEFAULT_MAIN_READER_PARAMS',
});

const initialMainReaderParams = {
    qvalue: '4',
    session: '255',
    scantime: '20',
};

export const initialState = {
  main: {
    status: 'disabled',
  },
  portable: {
    status: 'disabled',
  },
  mainReaderSettings: {
    shouldShowPopup: false,
    ip: {
        auto: true,
        address: '0.0.0.0',
    },
    params: initialMainReaderParams,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MAIN_READER_STATUS':
       return {
         ...state,
         main: {
           status: action.status,
         },
       };
    case 'RECEIVE_PORTABLE_READER_STATUS':
       return {
         ...state,
         portable: {
           status: action.status,
         },
       };
      case 'SHOW_MAIN_READER_SETTINGS':
        return {
            ...state,
            mainReaderSettings: {
                ...state.mainReaderSettings,
                shouldShowPopup: action.enable,
            },
        };
      case 'SET_IP_ADDRESS':
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  ip: {
                      ...state.mainReaderSettings.ip,
                      address: action.address,
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
                      auto: action.enable,
                  },
              },
          };
      case 'SET_MAIN_READER_PARAMS':
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  params: action.params,
              },
          };
      case 'SET_DEFAULT_MAIN_READER_PARAMS':
          return {
              ...state,
              mainReaderSettings: {
                  ...state.mainReaderSettings,
                  params: initialMainReaderParams,
              },
          };
    default:
      return state;
  }
};
