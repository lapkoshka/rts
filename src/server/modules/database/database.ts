import { Database } from 'sqlite3';
import { createAndPrepareDatabase } from './init';
import { ContestMethods, getContestMethods } from './tables/contests';
import { UserMethods, getUserMethods } from './tables/users';

class DbMorda {
    public database: Database;
    public contests: ContestMethods;
    public users: UserMethods;

    constructor() {
        this.database = createAndPrepareDatabase();
        this.contests = getContestMethods(this.database);
        this.users = getUserMethods(this.database);
    }

    public async closeDatabase(): Promise<void> {
        const db = await this.database;
        db.close((err: Error) => {
            if (err) {
                console.log('Cant close database, msg:' + err.message);
                throw err;
            }
        });
    }
}

export const dbMorda = new DbMorda();
