import { Database } from 'sqlite3';
import { createAndPrepareDatabase } from './init';
import { ContestMethods, getContestMethods } from './tables/contests';
import { getLapsMethods, LapsMethods } from './tables/laps';
import { getRacesMethods, RacesMethods } from './tables/races';
import { getTagContestMethods, TagContestMethods } from './tables/tag-contest';
import { getTagsMethods, TagsMethods } from './tables/tags';
import { UserMethods, getUserMethods } from './tables/users';

class DbMorda {
    public database: Database;
    public contests: ContestMethods;
    public users: UserMethods;
    public tagContest: TagContestMethods;
    public tagsMethods: TagsMethods;
    public races: RacesMethods;
    public laps: LapsMethods;

    constructor() {
        this.database = createAndPrepareDatabase();
        this.contests = getContestMethods(this.database);
        this.users = getUserMethods(this.database);
        this.tagContest = getTagContestMethods(this.database);
        this.tagsMethods = getTagsMethods(this.database);
        this.races = getRacesMethods(this.database);
        this.laps = getLapsMethods(this.database);
    }

    public closeDatabase(): void {
        this.database.close((err: Error) => {
            if (err) {
                console.log('Cant close database, msg:' + err.message);
                throw err;
            }
        });
    }
}

export const dbMorda = new DbMorda();
