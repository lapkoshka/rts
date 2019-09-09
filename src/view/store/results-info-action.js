// export const setMainReaderStatus = status => ({
//     type: 'RECEIVE_MAIN_READER_STATUS',
//     status
// });

export const setRaceHistory = history => ({
    type: 'SET_RACE_HISTORY',
    history
});
  
export const initialState = {
    history: [],
    users: [],
    total: []
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RACE_HISTORY':
            return {
                ...state,
                history: action.history
            }
        default:
            return state;
    }
}
