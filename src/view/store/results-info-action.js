export const setRaceHistory = history => ({
    type: 'SET_RACE_HISTORY',
    history,
});

export const setUsers = users => ({
    type: 'SET_USERS',
    users,
});

export const setTotalInfo = info => ({
   type: 'SET_TOTAL_INFO',
   info,
});

export const initialState = {
    history: [],
    users: [],
    total: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RACE_HISTORY':
            return {
                ...state,
                history: action.history,
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            };
        case 'SET_TOTAL_INFO':
            return {
                ...state,
                total: action.info,
            };
        default:
            return state;
    }
};
