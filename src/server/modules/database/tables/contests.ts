import { Database } from 'sqlite3';
import { ContestData } from '../../../view-data/contests/contests';

export type ContestFormData = Pick<ContestData, 'id' | 'name' | 'description' | 'laps'>;

export interface ContestMethods {
    create: () => Promise<void>;
    get: () => Promise<ContestData[]>;
    changeSettings: (data: ContestFormData) => Promise<void>;
}

export const getContestMethods = (database: Database): ContestMethods => ({
    create() {
        const sql = `insert into contests(
            name,
            description,
            laps,
            started_flag,
            finished_flag,
            start_time,
            finish_time
        ) values (?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            database.run(sql, ['Новое мероприятие', '', 1, 0, 0, 0, 0], (err: Error) => {
                if (err) {
                    throw Error(err.message);
                    reject();
                }

                resolve();
            });
        });
    },
    get() {
        const sql = `select * from contests`;
        return new Promise((resolve, reject) => {
            database.all(sql, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    changeSettings(data) {
        const { id, name, description, laps } = data;
        const sql = `update contests set name = (?), description = (?), laps = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            database.run(sql, [
                name,
                description,
                laps,
                id
            ], (err: any) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
})
