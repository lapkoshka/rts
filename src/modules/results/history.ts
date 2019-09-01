import { toHumanReadableTime } from '../../lib/functions';
import { getRaces, RaceData } from '../database/database';
import rootDispatcher from '../dispatcher/root-dispatcher';

export const updateRaceHistory = (): void => {
  getRaces().then((raceData: RaceData[]) => {
      const updateData = raceData.map((race: RaceData) => ({
          ...race,
          time: toHumanReadableTime(race.time),
      }));
      rootDispatcher.sendEvent('onRaceHistoryUpdate', updateData);
  }).catch((err: Error) => {
      throw err;
    });
};
