export const closeRegistrationPopup = () => ({
    type: 'CLOSE_REGISTRATION_POPUP',
});

export const openRegistrationPopup = () => ({
    type: 'OPEN_REGISTRATION_POPUP',
});

export const setRegistrationUser = user => ({
    type: 'SET_REGISTRATION_USER',
    user,
});

const initialState = {
    shouldShowPopup: false,
    user: {
        uid: '',
        firstname: '',
        lastname: '',
        alreadyRegistred: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_REGISTRATION_POPUP':
            return {
                ...state,
                shouldShowPopup: false,
            };
        case 'OPEN_REGISTRATION_POPUP':
            return {
                ...state,
                shouldShowPopup: true,
            };
        case 'SET_REGISTRATION_USER':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};
