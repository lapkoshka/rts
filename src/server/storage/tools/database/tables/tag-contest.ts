import { Database } from 'sqlite3';

export class TagContestMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public attachTagToContest(uid: string, contestId: number): Promise<void> {
        const sql = `insert into tag_contest (tag_uid, contest_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [uid, contestId], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public deattachContest(uid: string, contestId: number): Promise<void> {
        const sql = `delete from tag_contest where tag_uid = (?) and contest_id = (?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [uid, contestId], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public getContests(uid: string): Promise<number[]> {
        const sql = `select contest_id from tag_contest where tag_uid = (?)`;

        return new Promise((resolve, reject) => {
            this.database.all(sql, [uid], (err: Error, rows: { contest_id: number }[]) => {
                if (err) reject(err);
                resolve(rows.map(row => row.contest_id));
            });
        });
    }
}
