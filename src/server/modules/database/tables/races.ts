import { Database, Statement } from 'sqlite3';

// todo: интерфейсы уезжают в гидраторы данных
export interface RaceData {
    id: number;
    timestamp: string;
    firstname: string;
    lastname: string;
    time: number;
}

export interface UserRacesData {
    firstname: string;
    lastname: string;
    besttime: number;
    count: number;
}

export interface RacesMethods {
    insertRace: (userId: number, contestId: number, totalTime: number) => Promise<number>;
    deleteRace: (id: number) => Promise<void>;
    getRacesByContest: (contestId: number) => Promise<any>; // todo: any??

}

export const getRacesMethods = (database: Database): RacesMethods => ({
    insertRace(userId, contestId, totalTime) {
        const sql = 'insert into races(user_id, contest_id, time) values (?, ?, ?)';

        return new Promise((resolve, reject) => {
            const stmt: Statement = database.prepare(sql);
            stmt.run([userId, contestId, totalTime], function(err: Error) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    },
    deleteRace(id) {
        return new Promise((resolve, reject) => {
            database.run('begin transaction');
            database.run('delete from races where id = (?)', id);
            database.run('delete from laps where race_id = (?)', id);
            database.run('commit', (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    getRacesByContest(contestId) {
        const sql = `select races.*, users.firstname, users.lastname from races
            join users on races.user_id = users.id
            and races.contest_id = (?)
        `;

        return new Promise((resolve, reject) => {
            database.all(sql, [contestId], (err: Error, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
});
