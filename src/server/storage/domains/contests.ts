import { bool } from '../../../common/types';
import { dbMorda } from '../tools/database/database';
import { JsonStorage } from '../tools/filesystem/json-storage';

const SELECTED_CONTEST_ID = 'storage/contests/selected_contest_id';

export interface ContestData {
    id: number;
    name: string;
    description: string;
    laps: number;
    started_flag: bool;
    finished_flag: bool;
    start_time: number;
    finish_time: number;
}

export type ContestFormData = Pick<ContestData, 'id' | 'name' | 'description' | 'laps'>;

export class Contests {
    public static create(): Promise<number> {
        try {
            return dbMorda.contests.create();
        } catch (e) {
            throw Error(e);
        }
    }

    public static changeSettings(data: ContestFormData): Promise<void> {
        const { id, name, description, laps } = data;
        try {
            return dbMorda.contests.changeSettings(id, name, description, laps);
        } catch (e) {
            throw Error(e);
        }
    }

    public static delete(id: number): Promise<void> {
        try {
            return dbMorda.contests.delete(id);
        } catch (e) {
            throw Error(e);
        }
    }

    public static getStartedContests(): Promise<ContestData[]> {
        try {
            return dbMorda.contests.getStartedContests();
        } catch (e) {
            throw Error(e);
        }
    }

    public static start(id: number, timestamp: number): Promise<void> {
        try {
            return dbMorda.contests.start(id, timestamp);
        } catch (e) {
            throw Error(e);
        }
    }

    public static close(id: number, timestamp: number): Promise<void> {
        try {
            return dbMorda.contests.close(id, timestamp);
        } catch (e) {
            throw Error(e);
        }
    }

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
