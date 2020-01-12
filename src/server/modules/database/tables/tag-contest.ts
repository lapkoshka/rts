import { Database } from 'sqlite3';

export interface TagContestMethods {
    attachTagToContest: (uid: string, contestId: number) => Promise<void>;
    deattachContest: (uid: string, contestId: number) => Promise<void>;
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
    }
});
