import { connect } from 'react-redux';
import { getIpcRenderer } from '../../../electron/ipc';
import store, { RootState } from '../../store';
import RaceInfo, {RaceInfoProps} from './race-info';
import { setCurrentRaces} from '../../store/race-info-actions';
import { CurrentRaces} from '../../../server/controllers/race/race-info-view';
import Event = Electron.Event;
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RaceInfoProps => ({
    currentRaces: state.raceInfo.currentRaces,
});

const { dispatch } = store;
ipc.on('onCurrentRacesChanged', (_: Event, currentRaces: CurrentRaces) =>
  dispatch(setCurrentRaces(currentRaces)));

export default connect(mapStateToProps)(RaceInfo);
