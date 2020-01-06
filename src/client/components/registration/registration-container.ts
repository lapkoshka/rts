import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Ipc } from '../../../common/ipc';
import { PortableReaderTagData } from '../../../server/controllers/portable-reader/controller';
import { IPC_PORTABLE_READER, IPC_REGISTRATION } from '../../../server/ipc/ipc-events';
import { UserData } from '../../../server/modules/database/tables/users';
import { RootState, store } from '../../store';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
    setUserList,
} from '../../store/registration-store';
import { Registration, RegistrationActions, RegistrationProps } from './registration';

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
    userList: state.registration.userList,
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
    updateUserTag: (user: UserData) => {
        Ipc.send(IPC_REGISTRATION.UPDATE_USER_TAG, user);
        dispatch(closeRegistrationPopup());
    },
    onDeattachTag: (uid: string) => {
        Ipc.send(IPC_REGISTRATION.DEATTACH_TAG, uid);
        dispatch(closeRegistrationPopup());
    },
});

const { dispatch } = store;
Ipc.on<PortableReaderTagData>(IPC_PORTABLE_READER.TAG, (data) => {
    dispatch(setRegistrationUser(data.newUser));
    dispatch(setUserList(data.allUsers));
    dispatch(openRegistrationPopup());
});

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);
