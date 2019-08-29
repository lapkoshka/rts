import MainReader, { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { insertRace, UserData } from '../database/database';
import rootDispatcher from '../dispatcher/root-dispatcher';
import { updateUsersView } from '../users';
import Lap, { LAP_EVENT } from './domain/lap';
import { getUserByTag } from './domain/users';

interface Laps {
    [key: string]: Lap;
}
const currentLaps: Laps = {};

const getLap = async (tag: RFIDTag): Promise<Lap> => {
    const lap = currentLaps[tag.uid];
    if (lap) {
        return lap;
    }

    const user = await getUserByTag(tag);
    if (!user) {
        return;
    }

    return createLap(tag, user);
};

const view = {
    addUser(lap: Lap): void {
        rootDispatcher.sendEvent('onAddUser', {
            user: lap.user,
            timestamp: lap.startTrace.getHighestPoint().timestamp,
        });
    },
    decorateUserAsFinished(lap: Lap): void {
        rootDispatcher.sendEvent('onDecorateUserAsFinished', {
            user: lap.user,
            timestamp: lap.getTotalTime(),
        });
    },
    removeUser(user: UserData): Promise<void> {
        rootDispatcher.sendEvent('onRemoveUser', user);
        return new Promise((resolve) => {
           rootDispatcher
               .addPageListener('onUserRemoved', (_: any, removedUser: UserData) =>{
                  if (removedUser.uid === user.uid) {
                      resolve();
                  }
               });
        });
    },
};

const lapEventHandler = (lap: Lap) => {
    const {startTrace, finishTrace } = lap;

    if (finishTrace && finishTrace.completed) {
        insertRace(lap.user.uid, lap.getTotalTime());
        view.decorateUserAsFinished(lap);

        setTimeout(async () => {
            await view.removeUser(lap.user);
            delete currentLaps[lap.user.uid];
            updateUsersView();
        }, 2000);
        return;
    }

    if (startTrace && startTrace.completed) {
        view.addUser(lap);
    }
};


const createLap = (tag: RFIDTag, user: UserData): Lap => {
    const lap = new Lap(user);
    lap.on(LAP_EVENT.ON_START, lapEventHandler);
    lap.on(LAP_EVENT.ON_FINISH, lapEventHandler);
    currentLaps[tag.uid] = lap;

    return lap;
};

const handleRecievedTag = async (tag: RFIDTag): Promise<void> => {
    const lap = await getLap(tag);
    if (!lap) {
        return;
    }

    lap.appendTag(tag);
};

const init = (mainReader: MainReader): void => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        handleRecievedTag(tag);
    });
};

export default init;
