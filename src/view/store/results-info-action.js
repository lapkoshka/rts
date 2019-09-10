export const setRaceHistory = history => ({
    type: 'SET_RACE_HISTORY',
    history,
});

export const setUsers = users => ({
    type: 'SET_USERS',
    users,
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
        default:
            return state;
    }
};
