import { connect } from 'react-redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_RACE } from '../../../server/ipc/ipc-events';
import store, { RootState } from '../../store';
import RaceInfo, { RaceInfoProps } from './race-info';
import { setCurrentRaces } from '../../store/race-info-store';
import { CurrentRaces } from '../../../server/controllers/race/race-info-view';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): RaceInfoProps => ({
    currentRaces: state.raceInfo.currentRaces,
    closeRace: (uid: string) => ipc.send(IPC_RACE.ON_CLOSE_RACE, uid),
});

const { dispatch } = store;
ipc.on(IPC_RACE.CURRENT_RACES_CHANGED, (_: Event, currentRaces: CurrentRaces) =>
  dispatch(setCurrentRaces(currentRaces)));

export default connect(mapStateToProps)(RaceInfo);
