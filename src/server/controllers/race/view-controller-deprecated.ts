import Lap from '../../lib/domain/lap';
import { UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

export const lapViewController = {
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
            .addPageListener('onUserRemoved', (_: any, removedUser: UserData) => {
                if (removedUser.uid === user.uid) {
                    resolve();
                }
            });
        });
    },
};
