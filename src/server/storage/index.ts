import { Contests } from './domains/contests';
import { Races } from './domains/races';
import { Users } from './domains/users';
import { dbMorda } from './tools/database/database';

export class Storage {
    static contests = Contests;
    static races = Races;
    static users = Users;

    public static close() {
        dbMorda.closeDatabase();
    }
}
