import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_CONTESTS } from '../../../server/ipc/ipc-events';
import { ContestFormData } from '../../../server/modules/database/tables/contests';
import { ContestData } from '../../../server/view-data/contests/contests';
import { Notification } from '../../lib/notification';
import { RootState, store } from '../../store';
import {
    setContestList,
    setSelectedContest,
    setShowContestSettings,
} from '../../store/contest-info';
import { Contest, ContestActions, ContestProps } from './contest';
import { selectContest } from './selectors';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): ContestProps => ({
    list: state.contestInfo.contestList,
    selectedContest: selectContest(state.contestInfo.contestList, state.contestInfo.selectedContest),
    showContestSettings: state.contestInfo.showContestSettings,
});

const mapDispatchToProps = (dispatch: Dispatch): ContestActions => ({
    onContestCreate: () => {
        ipc.send(IPC_CONTESTS.CREATE);
    },
    onContestDelete: (id: number) => {
        ipc.send(IPC_CONTESTS.DELETE, id)
    },
    onContestSettingsChange: (data: ContestFormData) => {
        ipc.send(IPC_CONTESTS.SETTINGS_CHANGE, data);
    },
    onContestSelect: (id: number) => {
        dispatch(setSelectedContest(id));
    },
    onContestStart: (id: number) => {
        ipc.send(IPC_CONTESTS.START, id);
    },
    onContestClose: (id: number) => {
        ipc.send(IPC_CONTESTS.CLOSE, id)
    },
    setShowContestSettings: (show: boolean) => {
        dispatch(setShowContestSettings(show));
    }
});

const { dispatch } = store;
ipc.on(IPC_CONTESTS.LIST, (_, list: ContestData[]) => {
    dispatch(setContestList(list));
});

ipc.on(IPC_CONTESTS.CONTEST_CREATED, (_, id: number) => {
    dispatch(setSelectedContest(id));
    dispatch(setShowContestSettings(true));
});

ipc.on(IPC_CONTESTS.ON_CONTEST_DELETED, () => {
   dispatch(setSelectedContest(null));
   dispatch(setShowContestSettings(false));
});

ipc.on(IPC_CONTESTS.START_ERROR, () => {
   Notification.error('Для того, чтобы начать новое соревнование, нужно завершить уже запущенное', 4000);
});

export const ContestContainer = connect(mapStateToProps, mapDispatchToProps)(Contest);
