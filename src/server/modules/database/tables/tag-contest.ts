import { Database } from 'sqlite3';

export interface TagContestMethods {
    attachTagToContest: (uid: string, contestId: number) => Promise<void>;
    deattachContest: (uid: string, contestId: number) => Promise<void>;
    getContests: (uid: string) => Promise<number[]>;
}

export const getTagContestMethods = (database: Database): TagContestMethods => ({
    attachTagToContest(uid, contestId) {
        const sql = `insert into tag_contest (tag_uid, contest_id) values (?, ?)`;

        return new Promise((resolve, reject) => {
            database.run(sql, [uid, contestId], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    deattachContest(uid, contestId) {
        const sql = `delete from tag_contest where tag_uid = (?) and contest_id = (?)`;

        return new Promise((resolve, reject) => {
            database.run(sql, [uid, contestId], (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    getContests(uid) {
        const sql = `select contest_id from tag_contest where tag_uid = (?)`;

        return new Promise((resolve, reject) => {
           database.all(sql, [uid], (err: Error, rows: { contest_id: number }[]) => {
               if (err) reject(err);
               resolve(rows.map(row => row.contest_id));
           });
        });
    }
});
