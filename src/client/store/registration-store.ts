import { UserData } from '../../server/storage/domains/users';
import { Action } from './index';

type RegistrationStore = Action<UserData | UserData[] | string>;

export interface RegistrationState {
    incomingUid: string;
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

export const openRegistrationPopup = (payload: string) => ({
    type: OPEN_REGISTRATION_POPUP,
    payload,
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
    user: null,
    userList: [],
    incomingUid: '',
};

export const registrationReducer = (state = initialState, action: RegistrationStore) => {
    switch (action.type) {
        case CLOSE_REGISTRATION_POPUP:
            return {
                ...state,
                shouldShowPopup: false,
                incomingUid: '',
                user: null,
            };
        case OPEN_REGISTRATION_POPUP:
            return {
                ...state,
                shouldShowPopup: true,
                incomingUid: action.payload as string,
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
