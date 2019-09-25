import { connect } from 'react-redux';
import { getIpcRenderer, IPC_RACE } from '../../../common/ipc';
import store, { RootState } from '../../store';
import RaceInfo, { RaceInfoProps } from './race-info';
import { setCurrentRaces } from '../../store/race-info-store';
import { CurrentRaces } from '../../../server/controllers/race/race-info-view';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RaceInfoProps => ({
    currentRaces: state.raceInfo.currentRaces,
});

const { dispatch } = store;
ipc.on(IPC_RACE.CURRENT_RACES_CHANGED, (_: Event, currentRaces: CurrentRaces) =>
  dispatch(setCurrentRaces(currentRaces)));

export default connect(mapStateToProps)(RaceInfo);
