import { connect } from 'react-redux';
import { getIpcRenderer } from '../../../common/ipc';
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

const mapStateToProps = (state: RootState): ResultsInfoProps => ({
    history: state.resultsInfo.history,
    users: state.resultsInfo.users,
    total: state.resultsInfo.total,
    deleteRace: (id: number) => ipc.send('onRaceDelete', id),
    deleteUser: (uid: string) => ipc.send('onUserDelete', uid),
});

const { dispatch } = store;
ipc.on('onRaceHistoryUpdate', (_: Event, history: RaceHistory) =>
    dispatch(setRaceHistory(history)));

ipc.on('onUsersDataUpdate', (_: Event, users: Users) =>
    dispatch(setUsers(users)));

ipc.on('onTotalInfoUpdate', (_: Event, info: TotalInfo) =>
    dispatch(setTotalInfo(info)));

export default connect(mapStateToProps)(ResultsInfo);
