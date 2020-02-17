import { Database, Statement } from 'sqlite3';

export class UserMethods {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getUser(uid: string): Promise<any> {
        const sql = `select tags.uid, users.* from tags
            join users on tags.user_id = users.id and tags.uid = (?)`;

        return new Promise((resolve, reject) => {
            this.database.get(sql, [uid], (err, row) => {
                if (err) reject(err);

                if (!row) {
                    resolve(null);
                    return;
                }

                resolve(row);
            });
        });
    }

    public getUsers(): Promise<any[]> {
        const sql = `select users.*,
                group_concat(distinct tag_uid) as "tags",
                group_concat(distinct tag_contest.contest_id) as "contests"
         from users
                  left join tags t on users.id = t.user_id
                  left join tag_contest on tag_uid = t.uid
         group by user_id;`;

        return new Promise((resolve, reject) => {
            this.database.all(sql, (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    public updateUser(id: number, firstname: string, lastname: string): Promise<number> {
        const sql = `update users set firstname = (?), lastname = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            this.database.run(sql, [firstname, lastname, id], (err: Error) => {
                if (err) reject(err);

                resolve(id);
            });
        });
    }

    public insertUser(uid: string, firstname: string, lastname: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let lastId: number;
            this.database.serialize(() => {
                this.database.run(`begin transaction`);

                const usersInsertStmt: Statement = this.database.prepare(`insert into users (firstname, lastname) values (?, ?)`);
                // ATTENTION: non-arrow function is important, because `this` is context of Statement
                usersInsertStmt.run([firstname, lastname], function() {
                    lastId = this.lastID;
                });

                this.database.run(`insert into tags (uid, user_id) values (?, (SELECT last_insert_rowid()))`, uid);
                this.database.run("commit", (err) => {
                    if (err) reject(err);
                    resolve(lastId);
                });
            });
        });
    }

    public getUsersByContest(contestId: number): Promise<any[]> {
        const sql = `select t.user_id, u.*, tag_contest.*  from tag_contest
            left join tags t on t.uid = tag_contest.tag_uid
            join users u on t.user_id = u.id
            and tag_contest.contest_id = (?);`;

        return new Promise((resolve, reject) => {
            this.database.all(sql, [contestId], (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

}
