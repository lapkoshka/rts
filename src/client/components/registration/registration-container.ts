import Registration, {RegistrationProps} from './registration';
import { connect } from 'react-redux';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
} from '../../store/registration-actions';
import store, {RootState} from '../../store';
import { UserData } from '../../../server/modules/database/users';
import {getIpcRenderer} from "../../../electron/ipc";

const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
});

const mapDispatchToProps = dispatch => ({
    actions: {
        onCancelRegistration: () => {
            ipc.send('onCancelRegistration');
            dispatch(closeRegistrationPopup());
        },
        submitUser: user => {
            ipc.send('onRegistrationSubmit', user);
            dispatch(closeRegistrationPopup());
        },
    },
});

const { dispatch } = store;
ipc.on('onPortableReaderTag', (_, user: UserData) => {
    dispatch(setRegistrationUser(user));
    dispatch(openRegistrationPopup());
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
