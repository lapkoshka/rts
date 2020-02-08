import { updateContestsData } from './contests/updater';
import { updateUsersData, updateRaceHistory, updateTotalInfo } from './results/updater';
import { updateRaceInfo } from './race/updater';

// todo: interface of methods

export const viewUpdater = {
    contests: {
        updateContestsData,
    },
    results: {
        updateUsersData,
        updateRaceHistory,
        updateTotalInfo
    },
    race: {
        updateRaceInfo,
    },
};
