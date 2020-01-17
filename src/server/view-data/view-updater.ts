import { updateContestsData } from './contests/updater';
import { updateUsersData } from './results/updater';

export const viewUpdater = {
    contests: {
        updateContestsData,
    },
    results: {
        updateUsersData,
    },
    updateAll: (): void => {
        updateContestsData();
        updateUsersData();
    },
};
