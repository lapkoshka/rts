import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { Laps } from './lap-scenario';

export interface CurrentRaceLine {
    username: string;
}

export const updateRaceInfoView = (laps: Laps) => {
    const currentRaces = Object.keys(laps).reduce((races: CurrentRaceLine[], uid: string) => {
        const lap = laps[uid];
        races.push({
            username: lap.user.firstname + ' ' + lap.user.lastname
        });

        return races;
    }, []);

    rootDispatcher.sendEvent('onCurrentRacesChanged', {
        currentRaces
    });
};
