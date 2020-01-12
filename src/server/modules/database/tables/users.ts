import { Database, Statement } from 'sqlite3';
import { Nullable } from '../../../../common/types';

export interface UserData {
    uid: string;
    id: number;
    firstname: string;
    lastname: string;
    contest_id: Nullable<number>;
}

export interface UserFormData extends UserData {
    alreadyRegistred: boolean;
    attachUserId?: number;
    attachContestId?: number;
}

export interface UserMethods {
    getUser: (uid: string) => Promise<Nullable<UserData>>;
    getUsers: () => Promise<UserData[]>;
    updateUser: (user: UserData) => Promise<number>;
    insertUser: (user: UserData) => Promise<number>;
}

export const getUserMethods = (database: Database): UserMethods => ({
    getUser(uid) {
        const sql = `select tags.uid, users.*, tag_contest.contest_id from tags
            join users on tags.user_id = users.id and tags.uid = (?)
            left join tag_contest on tags.uid = tag_contest.tag_uid;`;

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
        const sql = `select tags.uid, users.*, tag_contest.contest_id from tags
          join users on tags.user_id = users.id
          left join tag_contest on tags.uid = tag_contest.tag_uid;`;

        return new Promise((resolve, reject) => {
            database.all(sql, (err: Error, rows: UserData[]) => {
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
});
