import { dbMorda } from '../tools/database/database';
import { JsonStorage } from '../tools/filesystem/json-storage';

const SELECTED_CONTEST_ID = 'storage/contests/selected_contest_id';

export class Contests {
    public static saveSelectedContest(id: number): void {
        JsonStorage.set(SELECTED_CONTEST_ID, id);
    }

    public static getSelectedContest(): number|undefined {
        const data = JsonStorage.get(SELECTED_CONTEST_ID);
        if (data === undefined || typeof data === 'number') {
            return data;
        }
    }

    public static async getCurrentContestId(): Promise<number> {
        try {
            return await dbMorda.contests.getCurrentContestId();
        } catch (e) {
            throw Error(e);
        }
    }
}
