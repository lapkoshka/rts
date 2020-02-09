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
}
