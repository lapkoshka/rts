import { Database, Statement } from 'sqlite3';
import { ContestData } from '../../../view-data/contests/contests';

export type ContestFormData = Pick<ContestData, 'id' | 'name' | 'description' | 'laps'>;

export interface ContestMethods {
    create: () => Promise<number>;
    delete: (id: number) => Promise<void>;
    start: (id: number, timestamp: number) => Promise<void>;
    close: (id: number, timestamp: number) => Promise<void>;
    get: () => Promise<ContestData[]>;
    changeSettings: (data: ContestFormData) => Promise<void>;
    getStartedContests: () => Promise<ContestData[]>;
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
        ) values (?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            const stmt: Statement = database.prepare(sql);
            stmt.run(['Новое мероприятие', '', 1, 0, 0, 0, 0],function(err: Error) {
                if (err) reject(err)
                resolve(this.lastID);
            });
        });
    },
    delete(id) {
        const sql = `delete from contests where id = (?)`

        return new Promise((resolve, reject) => {
            database.run(sql, id, (err: Error) => {
                if (err) reject(err);
                resolve();
            })
        });
    },
    start(id, timestamp) {
        const sql = `update contests set started_flag = (?), start_time = (?) where id = (?)`;
        const startedFlag = 1;

        return new Promise((resolve, reject) => {
            database.run(sql, [startedFlag, timestamp, id], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    close(id, timestamp) {
        const sql = `update contests set finished_flag = (?), finish_time = (?) where id = (?)`;
        const finishedFlag = 1;

        return new Promise((resolve, reject) => {
            database.run(sql, [finishedFlag, timestamp, id], (err: Error) => {
                if (err) reject(err);
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
            ], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    getStartedContests() {
        const sql = `select * from contests where started_flag = 1 and finished_flag = 0`;
        return new Promise((resolve, reject) => {
            database.all(sql, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
})
