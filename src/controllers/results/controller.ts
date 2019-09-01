import { deleteRace } from '../../modules/database/race';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './history';
import { updateTotalInfo } from './total';

export default () => {
    rootDispatcher.addPageListener('onRaceDelete', (_: any, id: number) => {
        deleteRace(id).then(() => {
           updateRaceHistory();
           updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });
};
