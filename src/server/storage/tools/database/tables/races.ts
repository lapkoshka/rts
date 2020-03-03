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
        const sql = `
            select
                laps.race_id as "id",
                races.time as "totalTime",
                min(laps.time) as "bestLapTime",
                count(laps.id) as "lapsCount",
                users.firstname,
                users.lastname
            
            from laps
                join races on races.id = laps.race_id
                join users on users.id = races.user_id
                and races.contest_id = (?)
            
            group by laps.race_id
            order by laps.time;
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
