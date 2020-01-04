import { Action } from './index';
import { UserData } from '../../server/modules/database/tables/users';

type RegistrationStore = Action<UserData>;

export interface RegistrationState {
    shouldShowPopup: boolean;
    user: UserData;
}

const CLOSE_REGISTRATION_POPUP = 'registration/CLOSE_REGISTRATION_POPUP';
const OPEN_REGISTRATION_POPUP = 'registration/OPEN_REGISTRATION_POPUP';
const SET_REGISTRATION_USER = 'registration/SET_REGISTRATION_USER';

export const closeRegistrationPopup = () => ({
    type: CLOSE_REGISTRATION_POPUP,
});

export const openRegistrationPopup = () => ({
    type: OPEN_REGISTRATION_POPUP,
});

export const setRegistrationUser = (payload: UserData) => ({
    type: SET_REGISTRATION_USER,
    payload,
});

const initialState: RegistrationState = {
    shouldShowPopup: false,
    user: {
        uid: '',
        firstname: '',
        lastname: '',
        alreadyRegistred: false,
    },
};

export const registrationReducer = (state = initialState, action: RegistrationStore) => {
    switch (action.type) {
        case CLOSE_REGISTRATION_POPUP:
            return {
                ...state,
                shouldShowPopup: false,
            };
        case OPEN_REGISTRATION_POPUP:
            return {
                ...state,
                shouldShowPopup: true,
            };
        case SET_REGISTRATION_USER:
            return {
                ...state,
                user: action.payload as UserData,
            };
        default:
            return state;
    }
};
