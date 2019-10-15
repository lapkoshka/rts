import { connect } from 'react-redux';
import { getIpcRenderer} from '../../../common/ipc';
import { IPC_RESULTS } from '../../../server/ipc/ipc-events';
import ResultsInfo, { ResultsInfoProps } from './results-info';
import store, { RootState } from '../../store';
import {
    setRaceHistory,
    setUsers,
    setTotalInfo,
} from '../../store/results-info-store';
import { RaceHistory } from '../../../server/controllers/results/history';
import { Users } from '../../../server/controllers/results/users';
import { TotalInfo } from '../../../server/controllers/results/total';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): Pick<ResultsInfoProps,
        'history' |
        'users' |
        'total' |
        'deleteRace' |
        'deleteUser'
    > => ({
    history: state.resultsInfo.history,
    users: state.resultsInfo.users,
    total: state.resultsInfo.total,
    deleteRace: (id: number) => ipc.send(IPC_RESULTS.ON_RACE_DELETE, id),
    deleteUser: (uid: string) => ipc.send(IPC_RESULTS.ON_RACE_DELETE, uid),
});

const { dispatch } = store;
ipc.on(IPC_RESULTS.RACE_HISTORY_UPDATE, (_: Event, history: RaceHistory) =>
    dispatch(setRaceHistory(history)));

ipc.on(IPC_RESULTS.USERS_DATA_UPDATE, (_: Event, users: Users) =>
    dispatch(setUsers(users)));

ipc.on(IPC_RESULTS.TOTAL_INFO_UPDATE, (_: Event, info: TotalInfo) =>
    dispatch(setTotalInfo(info)));

export default connect(mapStateToProps)(ResultsInfo);
