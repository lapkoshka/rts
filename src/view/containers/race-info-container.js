import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer as ipc} from 'electron';
import store from '../store';
import RaceInfo from '../components/race-info/race-info';
import { setCurrentRaces } from '../store/race-info-actions';

const mapStateToProps = state => ({
    currentRaces: state.raceInfo.currentRaces
});

const { dispatch } = store;
ipc.on('onCurrentRacesChanged', (_, currentRaces) =>
  dispatch(setCurrentRaces(currentRaces)));

export default connect(mapStateToProps)(RaceInfo);
