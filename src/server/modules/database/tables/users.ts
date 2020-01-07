import { Database, Statement } from 'sqlite3';
import { Nullable } from '../../../../common/types';

export interface UserData {
    id: number;
    uid: string;
    firstname: string;
    lastname: string;
    contests: number[];
}

export interface UserFormData extends UserData {
    alreadyRegistred: boolean;
    constestId?: number;
    attachUserId?: number;
}

export interface UserMethods {
    getUser: (uid: string) => Promise<Nullable<UserData>>;
    getUsers: () => Promise<UserData[]>;
    updateUser: (user: UserData) => Promise<number>;
    insertUser: (user: UserData) => Promise<number>;
    addTagForUser: (user: UserFormData) => Promise<void>;
    deleteTag: (uid: string) => Promise<void>;
    attachUserToContest: (userId: number, contestId: number) => Promise<void>;
    getUserContests: (user: UserData) => Promise<number[]>;
    deattachContest: (userId: number, contestId: number) => Promise<void>;
}

export const getUserMethods = (database: Database): UserMethods => ({
    getUser(uid) {
        const sql = `select * from tags join users on tags.user_id = users.id and tags.uid = (?);`;

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
        const sql = 'select * from users';
        // const cache = databaseCache[sql];
        // if (cache) {
        //     return Promise.resolve(cache);
        // }

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
                if (err) reject(`Something went wrong with user update: ${err.message}`);

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
    addTagForUser(user) {
        const { attachUserId, uid } = user;
        const sql = `insert into tags (uid, user_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
           database.run(sql, [uid, attachUserId], (err: Error) => {
               if (err) reject(err);
               resolve();
           });
        });
    },
    deleteTag(uid) {
        const sql = 'delete from tags where uid = (?)';

        return new Promise((resolve, reject) => {
           database.run(sql, uid, (err: Error) => {
               if (err) reject(err);
               resolve();
           });
        });
    },
    attachUserToContest(userId, contestId) {
        const sql = `insert into user_contest (user_id, contest_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
           database.run(sql, [userId, contestId], (err: Error) => {
              if (err) reject(err);
              resolve();
           });
        });
    },
    getUserContests({ id }) {
        const sql = `select contest_id from user_contest where user_id = (?)`;

        return new Promise((resolve, reject) => {
           database.all(sql, id, (err: Error, rows: { contest_id: number }[]) => {
               if (err) reject(err);
               resolve(rows.map((contest) => contest.contest_id));
           });
        });
    },
    deattachContest(userId, contestId) {
        const sql = `delete from user_contest where user_id = (?) and contest_id = (?)`;

        return new Promise((resolve, reject) => {
           database.run(sql, [userId, contestId], (err: Error) => {
              if (err) reject(err);
              resolve();
           });
        });
    }
});

//
// export const deleteUser = (uid: string): Promise<void> => {
//     const query = `delete from users where uid = (?);`;
//     return new Promise((resolve, reject) => {
//         database.run(query, uid, (err: Error) => {
//             if (err) {
//                 reject(err);
//             }
//
//             databaseCache.clear();
//             resolve();
//         });
//     });
// };
