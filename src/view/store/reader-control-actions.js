export const setMainReaderStatus = status => ({
  type: 'RECEIVE_MAIN_READER_STATUS',
  status
});

export const setPortableReaderStatus = status => ({
  type: 'RECEIVE_PORTABLE_READER_STATUS',
  status
});

export const initialState = {
  main: {
    status: 'disabled'
  },
  portable: {
    status: 'disabled'
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MAIN_READER_STATUS':
       return {
         ...state,
         main: {
           status: action.status
         }
       };
    case 'RECEIVE_PORTABLE_READER_STATUS':
       return {
         ...state,
         portable: {
           status: action.status
         }
       };
    default:
      return state;
  }
}
