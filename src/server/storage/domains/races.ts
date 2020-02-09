import { dbMorda } from '../tools/database/database';

export class Races {
    public static async deleteRace(id: number): Promise<void> {
        try {
            await dbMorda.races.deleteRace(id);
        } catch (e) {
            throw Error(e);
        }

        return;
    }

    public static async saveRace(userId: number, contestId: number, totalTime: number): Promise<number> {
        try {
            return await dbMorda.races.insertRace(userId, contestId, totalTime);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async saveLap(raceId: number, order: number, time: number): Promise<void> {
        try {
            await dbMorda.laps.insertLap(raceId, order, time);
        } catch (e) {
            throw Error(e);
        }
    }
}
