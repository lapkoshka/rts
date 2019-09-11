import { connect } from 'react-redux';
import ResultsInfo from './results-info';
import { ipcRenderer as ipc } from 'electron';
import store from '../../store';
import {
    setRaceHistory,
    setUsers,
    setTotalInfo,
} from '../../store/results-info-action';

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
ipc.on('onRaceHistoryUpdate', (_, history) =>
    dispatch(setRaceHistory(history)));

ipc.on('onUsersDataUpdate', (_, users) =>
    dispatch(setUsers(users)));

ipc.on('onTotalInfoUpdate', (_, info) =>
    dispatch(setTotalInfo(info)));

export default connect(mapStateToProps, mapDispatchToProps)(ResultsInfo);
