import { Dispatch } from 'redux';
import { IPC_PORTABLE_READER, IPC_REGISTRATION } from '../../../server/ipc/ipc-events';
import { Registration, RegistrationActions, RegistrationProps } from './registration';
import { connect } from 'react-redux';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
} from '../../store/registration-store';
import { store, RootState } from '../../store';
import { UserData } from '../../../server/modules/database/tables/users';
import { Ipc } from '../../../common/ipc';

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
});

const mapDispatchToProps = (dispatch: Dispatch): RegistrationActions => ({
    onCancelRegistration: () => {
        Ipc.send(IPC_REGISTRATION.CANCEL);
        dispatch(closeRegistrationPopup());
    },
    submitUser: (user: UserData) => {
        Ipc.send(IPC_REGISTRATION.SUBMIT, user);
        dispatch(closeRegistrationPopup());
    },
});

const { dispatch } = store;
Ipc.on<UserData>(IPC_PORTABLE_READER.TAG, (user) => {
    dispatch(setRegistrationUser(user));
    dispatch(openRegistrationPopup());
});

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);
