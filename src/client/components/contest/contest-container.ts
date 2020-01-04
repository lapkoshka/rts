import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Ipc } from '../../../common/ipc';
import { IPC_CONTESTS } from '../../../server/ipc/ipc-events';
import { ContestFormData } from '../../../server/modules/database/tables/contests';
import { ContestData } from '../../../server/view-data/contests/contests';
import { Notification } from '../../lib/notification';
import { RootState, store } from '../../store';
import {
    setContestList,
    setSelectedContest,
    showContestSettings,
} from '../../store/contest-info';
import { Contest, ContestActions, ContestProps } from './contest';
import { selectContest } from './selectors';

const mapStateToProps = (state: RootState): ContestProps => ({
    list: state.contestInfo.contestList,
    selectedContest: selectContest(state.contestInfo.contestList, state.contestInfo.selectedContest),
    showContestSettings: state.contestInfo.showContestSettings,
});

const mapDispatchToProps = (dispatch: Dispatch): ContestActions => ({
    onContestCreate: () => {
        Ipc.send(IPC_CONTESTS.CREATE);
    },
    onContestDelete: (id: number) => {
        Ipc.send(IPC_CONTESTS.DELETE, id);
    },
    onContestSettingsChange: (data: ContestFormData) => {
        Ipc.send(IPC_CONTESTS.SETTINGS_CHANGE, data);
    },
    onContestSelect: (id: number) => {
        dispatch(setSelectedContest(id));
    },
    onContestStart: (id: number) => {
        Ipc.send(IPC_CONTESTS.START, id);
    },
    onContestClose: (id: number) => {
        Ipc.send(IPC_CONTESTS.CLOSE, id);
    },
    setShowContestSettings: (show: boolean) => {
        dispatch(showContestSettings(show));
    }
});

const { dispatch } = store;
Ipc.on<ContestData[]>(IPC_CONTESTS.LIST, (list) => {
    dispatch(setContestList(list));
});

Ipc.on<number>(IPC_CONTESTS.CONTEST_CREATED, (id) => {
    dispatch(setSelectedContest(id));
    dispatch(showContestSettings(true));
});

Ipc.on(IPC_CONTESTS.ON_CONTEST_DELETED, () => {
   dispatch(setSelectedContest(null));
   dispatch(showContestSettings(false));
});

Ipc.on(IPC_CONTESTS.START_ERROR, () => {
   Notification.error('Для того, чтобы начать новое соревнование, нужно завершить уже запущенное', 4000);
});

export const ContestContainer = connect(mapStateToProps, mapDispatchToProps)(Contest);
