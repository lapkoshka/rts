import { Database } from 'sqlite3';

export interface EventMethods {
    create: () => void;
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

            database.run(sql, ['', '', 1, 0, 0, 0, 0], (err: Error) => {
                if (err) throw Error(err.message);
            });
        }
    }
}
