import { Contests } from './domains/contests';
import { Races } from './domains/races';
import { Users } from './domains/users';

export class Storage {
    static contests = Contests;
    static races = Races;
    static users = Users;
}
