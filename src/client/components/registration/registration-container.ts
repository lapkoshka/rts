import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Ipc } from '../../../common/ipc';
import { PortableReaderRegistrationData } from '../../../server/controllers/portable-reader';
import { DeattachContestData } from '../../../server/controllers/registration';
import { IPC_PORTABLE_READER, IPC_REGISTRATION } from '../../../server/databus/ipc/events';
import { UserFormData } from '../../../server/modules/database/tables/users';
import { RootState, store } from '../../store';
import {
    closeRegistrationPopup,
    openRegistrationPopup,
    setRegistrationUser,
    setUserList,
} from '../../store/registration-store';
import { selectCurrentContest } from '../contest/selectors';
import { Registration, RegistrationActions, RegistrationProps } from './registration';

const mapStateToProps = (state: RootState): RegistrationProps => ({
    shouldShowPopup: state.registration.shouldShowPopup,
    user: state.registration.user,
    userList: state.registration.userList,
    incomingUid: state.registration.incomingUid,
    currentContest: selectCurrentContest(state),
});

const mapDispatchToProps = (dispatch: Dispatch): RegistrationActions => ({
    onCancelRegistration: () => {
        Ipc.send(IPC_REGISTRATION.CANCEL);
        dispatch(closeRegistrationPopup());
    },
    submitUser: (formData: UserFormData) => {
        Ipc.send(IPC_REGISTRATION.SUBMIT, formData);
        dispatch(closeRegistrationPopup());
    },
    attachUser: (formData: UserFormData) => {
        Ipc.send(IPC_REGISTRATION.ATTACH_USER, formData);
        dispatch(closeRegistrationPopup());
    },
    onDeattachContest: (uid: string, contestId: number) => {
        Ipc.send<DeattachContestData>(IPC_REGISTRATION.DEATTACH_CONTEST, { uid, contestId });
        dispatch(closeRegistrationPopup());
    },
    onDeattachTag: (uid: string) => {
        Ipc.send(IPC_REGISTRATION.DEATTACH_TAG, uid);
        dispatch(closeRegistrationPopup());
    },
});

const { dispatch } = store;
Ipc.on<PortableReaderRegistrationData>(IPC_PORTABLE_READER.TAG, (data) => {
    dispatch(setRegistrationUser(data.user));
    dispatch(setUserList(data.allUsers));
    dispatch(openRegistrationPopup(data.uid));
});

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);
