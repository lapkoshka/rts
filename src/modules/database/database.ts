import { verbose, Database } from 'sqlite3';
import { User, Race } from '../../lib/types';
import * as fs from 'fs';
import { getUsersMap } from '../../lib/users';
import { databaseCache } from './cache';

const sqlite3 = verbose();
const DATABASE_CATALOG = './database';
const DATABASE_PATH = DATABASE_CATALOG + '/rts.db';

const connectDatabase = (): Database => {
    if (!fs.existsSync(DATABASE_CATALOG)) {
      fs.mkdirSync(DATABASE_CATALOG);
    }

    return new sqlite3.Database(DATABASE_PATH, (err: Error) => {
        if (err) {
          throw Error(err.message);
        }

        console.log(`Connected to the ${DATABASE_PATH} SQlite database.`);
    });
};

const prepareDatabase = (db: Database): void => {
  db.run(`create table if not exists users(
      uid not null unique,
      firstname text,
      lastname text,
      thirdname text,
      email text,
      phone text,
      about text,
      number integer,
      dob integer,
      city text,
      bike text
  );`);

  db.run(`create table if not exists race(
    id integer autoincremented,
    uid not null,
    time integer,
    date integer,
    event text
  );`);
};

const database = connectDatabase();
// TODO: need return promise from prepare?
prepareDatabase(database);

export const closeDatabase = (): void => {
  if (database) {
      database.close((err: Error) => {
          if (err) {
              throw err;
          }
      });
  }
};

export const getUser = async (uid: string): Promise<User> => {
  const query = `select * from users where uid = (?)`;
  const user: User = {
      uid,
      alreadyRegistred: false,
  };

  return new Promise((resolve, reject) => {
      database.get(query, [uid], (err, row) => {
          if (!row) {
              resolve(user);
              return;
          }

          user.alreadyRegistred = true;
          resolve(Object.assign(user, row));
      });
  });
};

export const getUsers = async (): Promise<User[]> => {
    const query = 'select * from users';
    const cache = databaseCache[query];
    if (cache) {
        return Promise.resolve(cache);
    }

    return new Promise((resolve, reject) => {
        database.all(query, (err: any, rows: any) => {
          if (err) {
            reject(err);
          }

          databaseCache[query] = rows;
          resolve(rows);
        });
    });
};

export const getUserRaces = (): Promise<Race[]> => {
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
              throw Error(err);
          }

          resolve(rows);
      });
    });
};

export const updateUser = (user: User): Promise<string> => {
    const { uid, firstname, lastname } = user;
    return new Promise((resolve, reject) => {
    database.run(`update users
      set
      firstname = (?),
      lastname = (?)
      where uid = (?)
    `, [
      firstname,
      lastname,
      uid,
    ], (err: any, row: any) => {
        if (err) {
            reject(`Something went wrong with user update: ${err.message}`);
        }

        databaseCache.clear();
        resolve('User updated');
    });
    });
};

export const insertUser = (user: User): Promise<string> => {
  const { uid, firstname, lastname } = user;
  return new Promise((resolve, reject) => {
    database.run(`insert into users(
      uid,
      firstname,
      lastname
      ) values (?, ?, ?)`, [
        uid,
        firstname,
        lastname,
      ], (err: any) => {

      const isUserAlreadyExist = err &&
          err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.uid';
      if (isUserAlreadyExist) {
          reject(`User with uid ${uid} already exist`);
      }

      databaseCache.clear();
      resolve(`A row has been inserted with uid ${uid}`);
    });
  });
};

export const insertRace = (uid: string, timestamp: number): void => {
    database.run(`insert into race (
        uid,
        time
    ) values (?, ?)`, [uid, timestamp], (err: any) => {
        if (err) {
            throw Error (err);
        }
    });
};
