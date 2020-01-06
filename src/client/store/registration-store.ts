import { Action } from './index';
import { UserData } from '../../server/modules/database/tables/users';

type RegistrationStore = Action<UserData | UserData[]>;

export interface RegistrationState {
    shouldShowPopup: boolean;
    user: UserData;
    userList: UserData[];
}

const CLOSE_REGISTRATION_POPUP = 'registration/CLOSE_REGISTRATION_POPUP';
const OPEN_REGISTRATION_POPUP = 'registration/OPEN_REGISTRATION_POPUP';
const SET_REGISTRATION_USER = 'registration/SET_REGISTRATION_USER';
const SET_USER_LIST = 'registration/SET_USER_LIST';

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

export const setUserList = (payload: UserData[]) => ({
    type: SET_USER_LIST,
    payload,
});

const initialState: RegistrationState = {
    shouldShowPopup: false,
    user: {
        id: undefined,
        uid: '',
        firstname: '',
        lastname: '',
        alreadyRegistred: false,
    },
    userList: [],
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
        case SET_USER_LIST:
            return {
                ...state,
                userList: action.payload as UserData[],
            };
        default:
            return state;
    }
};
