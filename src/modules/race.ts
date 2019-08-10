import { RootDispatcher } from '../index';
import MainReader from '../lib/readers/main-reader';
import { RFIDTag, User } from '../lib/types';
import { getUsersMap, toHumanReadableTime } from '../lib/users';
import { getUsers, insertRace } from './database/database';
import { updateUsersView } from './users';

interface StartLabel {
    user: User;
    start: number;
    total?: string;
    canMarkedAsFinished: boolean;
}

interface CurrentRaces {
    [key: string]: StartLabel;
}

const currentRaces: CurrentRaces = {};

const updateRaceView = (dispatcher: RootDispatcher) =>{
    dispatcher.sendEvent('onCurrentRacesUpdate', currentRaces);
};

const handleUserInRace = (user: User, dispatcher: RootDispatcher) => {
    const race = currentRaces[user.uid];
    if (!race) {
        currentRaces[user.uid] = {
            user,
            start: new Date().valueOf(),
            canMarkedAsFinished: false,
        };

        updateRaceView(dispatcher);
        setTimeout(() => {
            currentRaces[user.uid].canMarkedAsFinished = true;
            updateRaceView(dispatcher);
        }, 10000);
    }

    if (race && race.canMarkedAsFinished) {
        race.canMarkedAsFinished = false;
        const total = new Date().valueOf() - race.start;
        race.total = toHumanReadableTime(total);
        insertRace(user.uid, total);
        updateRaceView(dispatcher);

        setTimeout(() => {
            delete currentRaces[user.uid];
            updateRaceView(dispatcher);
            updateUsersView(dispatcher);
        }, 5000);
    }
};

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on('tag', async (tag: RFIDTag) => {
        const users = getUsersMap(await getUsers());
        const user = users.get(tag.uid);
        if (!user) {
            return;
        }

        handleUserInRace(user, dispatcher);
    });
};

export default init;
