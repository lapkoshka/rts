import { Database } from 'sqlite3';

export class LapsMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public insertLap(raceId: number, order: number, time: number): Promise<void> {
        const sql = 'insert into laps(number, race_id, time) values (?, ?, ?)';

        return new Promise((resolve, reject) => {
            this.database.run(sql, [order, raceId, time], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}
