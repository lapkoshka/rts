import { deleteRace } from '../../modules/database/race';
import { deleteUser } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './history';
import { updateTotalInfo } from './total';
import { updateUsers } from './users';

export default () => {
    rootDispatcher.addPageListener('onRaceDelete', (_: any, id: number) => {
        deleteRace(id).then(() => {
           updateRaceHistory();
           updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });

    rootDispatcher.addPageListener('onUserDelete', (_: any, uid: string) => {
        deleteUser(uid).then(() => {
            updateRaceHistory();
            updateUsers();
            updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });
};
