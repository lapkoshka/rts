import { Dispatch } from 'redux';
import Registration, { RegistrationActions, RegistrationProps } from './registration';
import { connect } from 'react-redux';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
} from '../../store/registration-store';
import store, { RootState } from '../../store';
import { UserData } from '../../../server/modules/database/users';
import {
    getIpcRenderer,
    IPC_PORTABLE_READER,
    IPC_REGISTRATION,
} from '../../../common/ipc';

const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
});

const mapDispatchToProps = (dispatch: Dispatch): RegistrationActions => ({
    onCancelRegistration: () => {
        ipc.send(IPC_REGISTRATION.CANCEL);
        dispatch(closeRegistrationPopup());
    },
    submitUser: (user: UserData) => {
        ipc.send(IPC_REGISTRATION.SUBMIT, user);
        dispatch(closeRegistrationPopup());
    },
});

const { dispatch } = store;
ipc.on(IPC_PORTABLE_READER.TAG, (_: Event, user: UserData) => {
    dispatch(setRegistrationUser(user));
    dispatch(openRegistrationPopup());
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
