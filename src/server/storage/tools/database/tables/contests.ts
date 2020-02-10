import { Database, Statement } from 'sqlite3';

export class ContestMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public create(): Promise<number> {
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
            const stmt: Statement = this.database.prepare(sql);
            stmt.run(['Новое мероприятие', '', 1, 0, 0, 0, 0], function(err: Error) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.serialize(() => {
                this.database.run('begin transaction');
                this.database.run(`delete from contests where id = (?)`, id);
                this.database.run(`delete from tag_contest where contest_id = (?)`, id);
                this.database.run('commit', (err: Error) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    }

    public start(id: number, timestamp: number): Promise<void> {
        const sql = `update contests set started_flag = 1, start_time = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [timestamp, id], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public close(id: number, timestamp: number): Promise<void> {
        const sql = `update contests set finished_flag = 1, finish_time = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [timestamp, id], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public getAll(): Promise<any[]> {
        const sql = `select * from contests`;
        return new Promise((resolve, reject) => {
            this.database.all(sql, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    public changeSettings(id: number, name: string, description: string, laps: number): Promise<void> {
        const sql = `update contests set name = (?), description = (?), laps = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [
                name,
                description,
                laps,
                id
            ], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public getStartedContests(): Promise<any[]> {
        const sql = `select * from contests where started_flag = 1 and finished_flag = 0`;
        return new Promise((resolve, reject) => {
            this.database.all(sql, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    public getCurrentContestId(): Promise<number|undefined> {
        const sql = `select id from contests where started_flag = 1 and finished_flag = 0`;
        return new Promise((resolve, reject) => {
            this.database.get(sql, [], (err, row) => {
                if (err) reject(err);
                resolve(row && row.id || undefined);
            });
        });
    }
}
