import { bool } from '../../../common/types';
import { CACHE_KEY, StorageCache } from '../tools/cache/storage-cache';
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

export type ContestFormData = Pick<ContestData, 'id' | 'name' | 'description'>;

export class Contests {
    public static async create(): Promise<number> {
        try {
            StorageCache.clearAll();
            return await dbMorda.contests.create();
        } catch (e) {
            throw Error(e);
        }
    }

    public static async changeSettings(data: ContestFormData): Promise<void> {
        const { id, name, description } = data;
        try {
            StorageCache.clearAll();
            return await dbMorda.contests.changeSettings(id, name, description);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async delete(id: number): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.contests.delete(id);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async getStartedContests(): Promise<ContestData[]> {
        try {
            return await dbMorda.contests.getStartedContests();
        } catch (e) {
            throw Error(e);
        }
    }

    public static async start(id: number, timestamp: number): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.contests.start(id, timestamp);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async close(id: number, timestamp: number): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.contests.close(id, timestamp);
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

    public static async getCurrentContestId(): Promise<number|undefined> {
        if (StorageCache.has(CACHE_KEY.GET_CURRENT_CONTEST_ID)) {
            return StorageCache.get(CACHE_KEY.GET_CURRENT_CONTEST_ID);
        }

        try {
            const contestId = await dbMorda.contests.getCurrentContestId();
            StorageCache.set(CACHE_KEY.GET_CURRENT_CONTEST_ID, contestId);

            return contestId;
        } catch (e) {
            throw Error(e);
        }
    }

    public static async getContestIds(uid: string): Promise<number[]> {
        try {
            return await dbMorda.tagContest.getContests(uid);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async deattachContest(uid: string, contestId: number): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.tagContest.deattachContest(uid, contestId);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async attachTagToContest(uid: string, contestId: number): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.tagContest.attachTagToContest(uid, contestId);
        } catch (e) {
            throw Error(e);
        }
    }
    public static async getAll(): Promise<ContestData[]> {
        try {
            return await dbMorda.contests.getAll();
        } catch (e) {
            throw Error(e);
        }
    }
}
