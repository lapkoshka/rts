export const initialState = {
    currentRaces: [],
  };

export const setCurrentRaces = currentRaces => ({
    type: 'SET_CURRENT_RACES',
    currentRaces
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_RACES':
            return action.currentRaces
        default:
            return state;
    }
}
  