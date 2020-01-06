import { Database } from 'sqlite3';

export interface UserData {
    id: number | undefined;
    uid: string;
    firstname: string;
    lastname: string;
    alreadyRegistred: boolean;
}

export interface UserMethods {
    getUser: (uid: string) => Promise<UserData>;
    getUsers: () => Promise<UserData[]>;
    updateUser: (user: UserData) => Promise<void>;
    insertUser: (user: UserData) => Promise<void>;
    addTagForUser: (user: UserData) => Promise<void>;
    deleteTag: (uid: string) => Promise<void>;
}

export const getUserMethods = (database: Database): UserMethods => ({
    getUser(uid) {
        const sql = `select * from tags join users on tags.user_id = users.id and tags.uid = (?);`;

        const user: UserData = {
            id: undefined,
            firstname: '',
            lastname: '',
            uid,
            alreadyRegistred: false,
        };

        return new Promise((resolve, reject) => {
            database.get(sql, [uid], (err, row) => {
                if (err) reject(err);

                if (!row) {
                    resolve(user);
                    return;
                }

                user.alreadyRegistred = true;
                resolve(Object.assign(user, row));
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
            database.all(sql, (err: any, rows: any) => {
                if (err) {
                    reject(err);
                }

                // databaseCache[query] = rows;
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

                // databaseCache.clear();
                resolve();
            });
        });
    },
    insertUser(user) {
        const { uid, firstname, lastname } = user;

        return new Promise((resolve, reject) => {
            database.serialize(() => {
                database.run(`begin transaction`);
                database.run(`insert into users (firstname, lastname) values (?, ?)`, firstname, lastname);
                database.run(`insert into tags (uid, user_id) values (?, (SELECT last_insert_rowid()))`, uid);
                database.run("commit", (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    },
    addTagForUser(user) {
        const { id, uid } = user;
        const sql = `insert into tags (uid, user_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
           database.run(sql, [uid, id], (err: Error) => {
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
