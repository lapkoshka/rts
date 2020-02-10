import { IPC_RACE } from '../../databus/ipc/events';
import { IpcRoot } from '../../databus/ipc/root';
import { toHumanReadableTime } from '../../lib/functions';

// todo: вероятно, это плохая зависимость. Думаю что представление даннных
// должно быть согласовано через интерфейс со всеми сценариями гонок (если они появятся)
// В целом, появление других сценариев может менять даже пользовательский интерфейс.
import { currentRaces as racesState } from '../../modules/race-scenarios/circles';

export interface CurrentRaceRow {
    uid: string;
    username: string;
    laps: string;
    bestlap: string;
}

export type CurrentRaces = CurrentRaceRow[];

export class RaceViewUpdater {
    public static updateRaceInfo(): void {
        const currentRaces = Object.keys(racesState)
            .reduce((currentRaces: CurrentRaces, uid: string) => {
                const race = racesState[uid];
                const bestTime = race.getBestTime();
                currentRaces.push({
                    uid,
                    username: `${race.user.firstname} ${race.user.lastname}`,
                    laps: race.getLapsCounter(),
                    bestlap: bestTime ? toHumanReadableTime(bestTime) : '-',
                });

                return currentRaces;
            }, []);

        IpcRoot.send<CurrentRaces>(IPC_RACE.CURRENT_RACES_CHANGED, currentRaces);
    }
}
