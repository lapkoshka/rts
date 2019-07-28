import { verbose, Database } from 'sqlite3';

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
  }

  const database = connectDatabase();

  // TODO: need return promise from prepare?
  prepareDatabase(database);

  export default database;