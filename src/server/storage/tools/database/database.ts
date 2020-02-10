import { Database } from 'sqlite3';
import { createAndPrepareDatabase } from './init';
import { ContestMethods } from './tables/contests';
import { UserMethods } from './tables/users';
import { TagContestMethods } from './tables/tag-contest';
import { TagsMethods } from './tables/tags';
import { RacesMethods } from './tables/races';
import { LapsMethods } from './tables/laps';

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
        this.contests = new ContestMethods(this.database);
        this.users = new UserMethods(this.database);
        this.tagContest = new TagContestMethods(this.database);
        this.tagsMethods = new TagsMethods(this.database);
        this.races = new RacesMethods(this.database);
        this.laps = new LapsMethods(this.database);
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
