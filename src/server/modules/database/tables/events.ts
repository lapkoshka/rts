import { Database } from 'sqlite3';
import { EventData } from '../../../view-data/events/events';

export interface EventMethods {
    create: () => Promise<void>;
    get: () => Promise<EventData[]>;
}

export const getEventMethods = (database: Database): EventMethods => {
    return {
        create() {
            const sql = `insert into events (
                name,
                description,
                laps,
                started_flag,
                finished_flag,
                start_time,
                finish_time
            ) values (?, ?, ?, ?, ?, ?, ?)`;

            return new Promise((resolve, reject) => {
                database.run(sql, ['Новое событие', '', 1, 0, 0, 0, 0], (err: Error) => {
                    if (err) {
                        throw Error(err.message);
                        reject();
                    }

                    resolve();
                });
            });
        },
        get() {
            const sql = `select * from events`;
            return new Promise((resolve, reject) => {
                database.all(sql, [], (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
            });
        }
    }
}
