import { verbose, Database } from 'sqlite3';
import { User, Race } from '../lib/types';

const sqlite3 = verbose();
const DATABASE_PATH = './database/rts.db';

const connectDatabase = (): Database => {
    return new sqlite3.Database(DATABASE_PATH, (err: Error) => {
        if (err) {
          throw Error(err.message);
        }
  
        console.log(`Connected to the ${DATABASE_PATH} SQlite database.`);
    });
  }
  
const prepareDatabase = (db: Database):void => {
  // something wrong with res and err types
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

}

const database = connectDatabase();
// TODO: need return promise from prepare?
prepareDatabase(database);

export const getUser = async(uid: string): Promise<User> => {
  const user: User = {
      uid,
      alreadyRegistred: false
  };

  return new Promise((resolve, reject) => {
      database.get(`select * from users where uid = (?)`, [uid], (err, row) => {
          if (!row) {
              resolve(user);
              return;
          }

          user.alreadyRegistred = true;
          resolve(Object.assign(user, row));
      })
  });
}

export const getUsers = async(): Promise<Array<User>> => {
  return new Promise((resolve, reject) => {
    database.all('select * from users', (err: any, rows: any) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

export const getUserRaces = (tag: string): Promise<Array<Race>> => {
  return new Promise((resolve, reject) => {
    // inner join
    resolve([])
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
            // TODO: logger for exceptions with gui on client
            reject(`Something went wrong with user update: ${err.message}`);
        }

        resolve('User updated');
    });
  });
}

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
      ], function(err) {

      const isUserAlreadyExist = err && 
          err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.uid';
      if (isUserAlreadyExist) {
          // TODO: logger for exceptions with gui on client
          reject(`User with uid ${uid} already exist`);
      }

      resolve(`A row has been inserted with uid ${uid}`);
    });
  });
} 