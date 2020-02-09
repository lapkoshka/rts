import { Nullable } from '../../../common/types';
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
        try {
            const rows = await dbMorda.users.getUsers();
            const users = rows.map((row) => ({
                ...row,
                contests: this.parseContests(row.contests),
                tags: this.parseTags(row.tags),
            }));

            return users;
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
