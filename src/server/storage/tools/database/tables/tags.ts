import { Database } from 'sqlite3';

export class TagsMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public addTagForUser(uid: string, userId: number): Promise<void> {
        const sql = `insert into tags (uid, user_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [uid, userId], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public deleteTag(uid: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.run('begin transaction');
            this.database.run('delete from tags where uid = (?)', uid);
            this.database.run('delete from tag_contest where tag_uid = (?)', uid);
            this.database.run('commit', (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    public getUserId(uid: string): Promise<number | undefined> {
        const sql = `select user_id from tags where uid = (?)`;
        return new Promise((resolve, reject) => {
            this.database.get(sql, [uid], (err: Error, row) => {
                if (err) reject (err);
                resolve(row && row.user_id || undefined);
            });
        });
    }
}
