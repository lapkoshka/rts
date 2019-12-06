import { database } from '../database';

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

export const getRaces = (): Promise<RaceData[]> => {
    const query = `
        select
        r.id as "id",
        r.timestamp as "timestamp",
        u.firstname as "firstname",
        u.lastname as "lastname",
        r.time as "time"
        from race r
        join users u
        on r.uid = u.uid
        order by id desc
        limit 40
        `;

    return new Promise((resolve, reject) => {
        database.all(query, (err: any, rows: any) => {
            if (err) {
                reject(err);
            }

            resolve(rows);
        });
    });
};

export const getTotalUserRaces = (): Promise<UserRacesData[]> => {
    const query = `
        select u.uid as "uid",
        u.firstname as "firstname",
        u.lastname as "lastname",
        count(r.uid) as "count",
        min(r.time) as "besttime"
        from race r
        join users u
        on r.uid = u.uid
        group by r.uid
        order by besttime asc
    `;

    return new Promise((resolve, reject) => {
        database.all(query, (err: any, rows: any) => {
            if (err) {
                reject(err);
            }

            resolve(rows);
        });
    });
};

export const insertRace = (uid: string, timestamp: number): void => {
    database.run(`insert into race (
        uid,
        time
    ) values (?, ?)`, [uid, timestamp], (err: any) => {
        if (err) {
            throw Error(err);
        }
    });
};

export const deleteRace = (id: number): Promise<void> => {
    const query = `delete from race where id = ?`;
    return new Promise((resolve, reject) => {
        database.run(query, id, (err: Error) => {
            if (err) {
                reject(Error);
            }

            resolve();
        });
    });
};
