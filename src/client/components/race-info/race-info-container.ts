import { connect } from 'react-redux';
import { Ipc } from '../../../common/ipc';
import { IPC_RACE } from '../../../server/databus/ipc/events';
import { store, RootState } from '../../store';
import { RaceInfo, RaceInfoProps } from './race-info';
import { setCurrentRaces } from '../../store/race-info-store';
import { CurrentRaces } from '../../../server/view-data/race/updater';

const mapStateToProps = (state: RootState): RaceInfoProps => ({
    currentRaces: state.raceInfo.currentRaces,
    closeRace: (uid: string) => Ipc.send(IPC_RACE.ON_CLOSE_RACE, uid),
});

const { dispatch } = store;
Ipc.on<CurrentRaces>(IPC_RACE.CURRENT_RACES_CHANGED, (currentRaces) => {
    dispatch(setCurrentRaces(currentRaces));
});


export const RaceInfoContainer = connect(mapStateToProps)(RaceInfo);
