import { Database } from 'sqlite3';
import { createAndPrepareDatabase } from './init';
import { EventMethods, getEventMethods } from './tables/events';

class DbMorda {
    public database: Database;
    public events: EventMethods;

    constructor() {
        this.database = createAndPrepareDatabase();
        this.events = getEventMethods(this.database);
        // this.users = getUsersMethods(this.database);
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
