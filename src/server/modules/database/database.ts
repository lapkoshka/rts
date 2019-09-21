import * as fs from 'fs';
import { Database, verbose } from 'sqlite3';

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
    id integer primary key autoincrement,
    timestamp datetime default current_timestamp,
    uid not null,
    time integer,
    date integer,
    event text
  );`);
};

export const database = connectDatabase();
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

