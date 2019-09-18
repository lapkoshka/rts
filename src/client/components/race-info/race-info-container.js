import { connect } from 'react-redux';
import store from '../../store';
import RaceInfo from './race-info';
import { setCurrentRaces } from '../../store/race-info-actions';
const electron = window.require('electron');
//const fs = electron.remote.require('fs');

const ipc  = electron.ipcRenderer;

const mapStateToProps = state => ({
    currentRaces: state.raceInfo.currentRaces,
});

const { dispatch } = store;
ipc.on('onCurrentRacesChanged', (_, currentRaces) =>
  dispatch(setCurrentRaces(currentRaces)));

export default connect(mapStateToProps)(RaceInfo);
