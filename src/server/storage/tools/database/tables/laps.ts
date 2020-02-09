import { Database } from 'sqlite3';

export interface LapsMethods {
    insertLap: (raceId: number, order: number, time: number) => Promise<void>;
}

export const getLapsMethods = (database: Database): LapsMethods => ({
    insertLap(raceId, order, time) {
        const sql = 'insert into laps(number, race_id, time) values (?, ?, ?)';

        return new Promise((resolve, reject) => {
            database.run(sql, [order, raceId, time], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
});
