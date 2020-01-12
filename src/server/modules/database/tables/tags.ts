import { Database } from 'sqlite3';
import { UserFormData } from './users';

export interface TagsMethods {
    addTagForUser: (user: UserFormData) => Promise<void>;
    deleteTag: (uid: string) => Promise<void>;
}

export const getTagsMethods = (database: Database): TagsMethods => ({
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
        return new Promise((resolve, reject) => {
            database.run('begin transaction');
            database.run('delete from tags where uid = (?)', uid);
            database.run('delete from tag_contest where tag_uid = (?)', uid);
            database.run('commit', (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
});
