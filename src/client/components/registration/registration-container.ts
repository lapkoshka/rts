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
import { getIpcRenderer } from '../../../common/ipc';

const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
});

const mapDispatchToProps = (dispatch: Dispatch): RegistrationActions => ({
    onCancelRegistration: () => {
        ipc.send('onCancelRegistration');
        dispatch(closeRegistrationPopup());
    },
    submitUser: (user: UserData) => {
        ipc.send('onRegistrationSubmit', user);
        dispatch(closeRegistrationPopup());
    },
});

const { dispatch } = store;
ipc.on('onPortableReaderTag', (_: Event, user: UserData) => {
    dispatch(setRegistrationUser(user));
    dispatch(openRegistrationPopup());
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
