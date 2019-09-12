import Registration from './registration';
import { connect } from 'react-redux';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
} from '../../store/registration';
import { ipcRenderer as ipc } from 'electron';
import store from '../../store';

const mapStateToProps = state => ({
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
ipc.on('onPortableReaderTag', (_, user) => {
    dispatch(setRegistrationUser(user));
    dispatch(openRegistrationPopup());
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);