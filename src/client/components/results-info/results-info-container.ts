import { connect } from 'react-redux';
import ResultsInfo from './results-info';
import store from '../../store';
import {
    setRaceHistory,
    setUsers,
    setTotalInfo,
} from '../../store/results-info-action';
import { RaceHistory } from '../../../server/controllers/results/history';
import { Users } from '../../../server/controllers/results/users';
import { TotalInfo } from '../../../server/controllers/results/total';
const ipc = window.require('electron').ipcRenderer;

const mapStateToProps = state => ({
    history: state.resultsInfo.history,
    users: state.resultsInfo.users,
    total: state.resultsInfo.total,
});

const mapDispatchToProps = dispatch => ({
    historyActions: {
        deleteRace: id => ipc.send('onRaceDelete', id),
    },
    usersActions: {
        deleteUser: uid => ipc.send('onUserDelete', uid),
    },
});

const { dispatch } = store;
ipc.on('onRaceHistoryUpdate', (_, history: RaceHistory) =>
    dispatch(setRaceHistory(history)));

ipc.on('onUsersDataUpdate', (_, users: Users) =>
    dispatch(setUsers(users)));

ipc.on('onTotalInfoUpdate', (_, info: TotalInfo) =>
    dispatch(setTotalInfo(info)));

export default connect(mapStateToProps, mapDispatchToProps)(ResultsInfo);
