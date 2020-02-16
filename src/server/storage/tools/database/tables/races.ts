import { Database, Statement } from 'sqlite3';

export class RacesMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public insertRace(userId: number, contestId: number, totalTime: number): Promise<number> {
        const sql = 'insert into races(user_id, contest_id, time) values (?, ?, ?)';

        return new Promise((resolve, reject) => {
            const stmt: Statement = this.database.prepare(sql);
            stmt.run([userId, contestId, totalTime], function(err: Error) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    public deleteRace(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.run('begin transaction');
            this.database.run('delete from races where id = (?)', id);
            this.database.run('delete from laps where race_id = (?)', id);
            this.database.run('commit', (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public getRacesByContest(contestId: number): Promise<any[]> {
        const sql = `select races.*, users.firstname, users.lastname from races
            join users on races.user_id = users.id
            and races.contest_id = (?)
        `;

        return new Promise((resolve, reject) => {
            this.database.all(sql, [contestId], (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    public getTotalInfoByContest(contestId: number): Promise<any[]> {
        const sql = `select
           u.id,
           u.firstname as "firstname",
           u.lastname as "lastname",
           count(u.id) as "count",
           min(r.time) as "besttime"
        from races r
                 join users u on r.user_id = u.id
                 and r.contest_id = (?)
        group by u.id
        order by time asc`;

        return new Promise((resolve, reject) => {
            this.database.all(sql, [contestId], (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}
