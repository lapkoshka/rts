import rootDispatcher from './../../modules/dispatcher/root-dispatcher';
import { Laps } from './lap-scenario';

export const updateRaceInfoView = (laps: Laps) => {
    const currentRaces = Object.keys(laps).reduce((usernames: Object[], uid: string) => {
        const lap = laps[uid];
        usernames.push({
            username: lap.user.firstname + ' ' + lap.user.lastname
        });

        return usernames;
    }, []);

    rootDispatcher.sendEvent('onCurrentRacesChanged', {
        currentRaces
    });
};