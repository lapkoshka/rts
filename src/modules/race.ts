import { RootDispatcher } from '../index';
import { User } from '../lib/types';
import { toHumanReadableTime } from '../lib/users';
import { insertRace } from './database/database';

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

const updateView = (dispatcher: RootDispatcher) =>{
    dispatcher.sendEvent('onCurrentRacesUpdate', currentRaces);
};

export const handleUserInRace = (user: User, dispatcher: RootDispatcher) => {
    const race = currentRaces[user.uid];
    if (!race) {
        currentRaces[user.uid] = {
            user,
            start: new Date().valueOf(),
            canMarkedAsFinished: false,
        };

        updateView(dispatcher);
        setTimeout(() => {
            currentRaces[user.uid].canMarkedAsFinished = true;
            updateView(dispatcher);
        }, 10000);
    }

    if (race && race.canMarkedAsFinished) {
        race.canMarkedAsFinished = false;
        const total = new Date().valueOf() - race.start;
        race.total = toHumanReadableTime(total);
        insertRace(user.uid, total);
        updateView(dispatcher);

        setTimeout(() => {
            delete currentRaces[user.uid];
            updateView(dispatcher);
        }, 5000);
    }
};