import { Database, Statement } from 'sqlite3';
import { Nullable } from '../../../../../common/types';
import { UserData } from '../../../domains/users';

export interface UserMethods {
    getUser: (uid: string) => Promise<Nullable<any>>;
    getUsers: () => Promise<any[]>;
    updateUser: (user: UserData) => Promise<number>;
    insertUser: (user: UserData) => Promise<number>;
    getUsersByContest: (contestId: number) => Promise<UserData[]>;
}

export const getUserMethods = (database: Database): UserMethods => ({
    getUser(uid) {
        const sql = `select tags.uid, users.* from tags
            join users on tags.user_id = users.id and tags.uid = (?)`;

        return new Promise((resolve, reject) => {
            database.get(sql, [uid], (err, row) => {
                if (err) reject(err);

                if (!row) {
                    resolve(null);
                    return;
                }

                resolve(row);
            });
        });
    },
    getUsers() {
        const sql = `select users.*, 
            group_concat(distinct tag_uid) as "tags",
            group_concat(distinct tag_contest.contest_id) as "contests" 
            from users
                left join tags t on users.id = t.user_id
                left join tag_contest on tag_uid = t.uid
            group by user_id;`;

        return new Promise((resolve, reject) => {
            database.all(sql, (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    updateUser(user) {
        const { id, firstname, lastname} = user;
        const sql = `update users set firstname = (?), lastname = (?) where id = (?)`;

        return new Promise((resolve, reject) => {
            database.run(sql, [firstname, lastname, id], (err: Error) => {
                if (err) reject(err);

                resolve(id);
            });
        });
    },
    insertUser(user) {
        const { uid, firstname, lastname } = user;

        return new Promise((resolve, reject) => {
            let lastId: number;
            database.serialize(() => {
                database.run(`begin transaction`);

                const usersInsertStmt: Statement = database.prepare(`insert into users (firstname, lastname) values (?, ?)`);
                usersInsertStmt.run([firstname, lastname], function() {
                    lastId = this.lastID;
                });

                database.run(`insert into tags (uid, user_id) values (?, (SELECT last_insert_rowid()))`, uid);
                database.run("commit", (err) => {
                    if (err) reject(err);
                    resolve(lastId);
                });
            });
        });
    },
    getUsersByContest(contestId) {
        const sql = `select t.user_id, u.*, tag_contest.*  from tag_contest
            left join tags t on t.uid = tag_contest.tag_uid
            join users u on t.user_id = u.id
            and tag_contest.contest_id = (?)
        group by contest_id;`;

        return new Promise((resolve, reject) => {
           database.all(sql, [contestId], (err: Error, rows) => {
              if (err) reject(err);
              resolve(rows);
           });
        });
    },
});
