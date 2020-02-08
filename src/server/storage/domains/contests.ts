import { JsonStorage } from '../filesystem/json-storage';

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
}
