import { connect } from "redux";
import ResultsInfo from "../components/results-info/results-info";
import { ipcRenderer as ipc } from "electron";
import store from './../store';

const mapStateToProps = state => ({
    history: state.resultsInfo.history,
    users: state.resultsInfo.state,
    total: state.resultsInfo.total
});

// const { dispatch } = store;
// ipc.on('onRaceHistoryUpdate', (_, history) =>
//     dispatch(setRaceHistory(history)));

export default connect()(ResultsInfo);