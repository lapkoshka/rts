import { Nullable } from '../../../common/types';
import { CACHE_KEY, StorageCache } from '../tools/cache/storage-cache';
import { dbMorda } from '../tools/database/database';

export interface UserData {
    uid: string;
    id: number;
    firstname: string;
    lastname: string;
    contests: number[];
}

export interface UserFormData extends UserData {
    alreadyRegistred: boolean;
    attachUserId?: number;
    attachContestId?: number;
}

export class Users {
    public static async getUser(uid: string): Promise<Nullable<UserData>> {
        try {
            const row = await dbMorda.users.getUser(uid);
            if (row === null) {
                return row as null;
            }

            return row as UserData;
        } catch (e) {
            throw Error(e);
        }
    }

    public static async getUsers(): Promise<UserData[]> {
        if (StorageCache.has(CACHE_KEY.GET_USERS)) {
            return StorageCache.get(CACHE_KEY.GET_USERS);
        }

        try {
            const rows = await dbMorda.users.getUsers();
            const users = rows.map((row) => ({
                ...row,
                contests: this.parseContests(row.contests),
                tags: this.parseTags(row.tags),
            }));

            StorageCache.set(CACHE_KEY.GET_USERS, users);
            return users;
        } catch (e) {
            throw Error(e);
        }
    }

    public static async getUserId(uid: string): Promise<number | undefined> {
        try {
            return await dbMorda.tagsMethods.getUserId(uid);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async saveUser(formData: UserFormData): Promise<number> {
        try {
            StorageCache.clearAll();
            const { uid, firstname, lastname } = formData;
            return await dbMorda.users.insertUser(uid, firstname, lastname);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async updateUser(formData: UserFormData): Promise<number> {
        try {
            StorageCache.clearAll();
            const { id, firstname, lastname } = formData;
            return await dbMorda.users.updateUser(id, firstname, lastname);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async attachTagToUser(formData: UserFormData): Promise<void> {
        try {
            StorageCache.clearAll();
            const { attachUserId, uid } = formData;
            return await dbMorda.tagsMethods.addTagForUser(uid, attachUserId);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async deattachTag(uid: string): Promise<void> {
        try {
            StorageCache.clearAll();
            return await dbMorda.tagsMethods.deleteTag(uid);
        } catch (e) {
            throw Error(e);
        }
    }

    public static async getUsersByContest(contestId: number): Promise<UserData[]> {
        try {
            return await dbMorda.users.getUsersByContest(contestId);
        } catch (e) {
            throw Error(e);
        }
    }

    private static parseContests(groupConcatValue?: string): number[] {
        return groupConcatValue ? groupConcatValue
            .split(',')
            .map((strContestId: string) =>
                parseInt(strContestId, 10)) : [];
    }

    private static parseTags(groupConcatValue?: string): string[] {
        return groupConcatValue ? groupConcatValue.split(',') : [];
    }
}
