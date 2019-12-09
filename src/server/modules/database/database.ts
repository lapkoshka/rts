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
    const createTablesIfNotExists = `
        create table if not exists events(
            id integer primary key autoincrement,
            name text,
            description text,
            laps unsigned integer,
            started_flag unsigned integer,
            finished_flag unsigned integer,
            start_time unsigned integer,
            finish_time unsigned integer);

        create table if not exists users(
            id integer primary key autoincrement,
            firstname text,
            lastname text,
            thirdname text,
            email text,
            phone text,
            about text,
            number integer,
            city text,
            bike text);

        create table if not exists races(
            id integer primary key autoincrement,
            user_id unsigned integer,
            event_id unsigned integer,
            timestamp datetime default current_timestamp,
            time unsigned integer,

            constraint fk_user_id
                foreign key (user_id)
                references users(id),
            constraint fk_event_id
                foreign key (event_id)
                references events(id));

        create table if not exists laps(
            id integer primary key autoincrement,
            number unsigned integer,
            race_id unsigned integer,
            time unsigned integer,
            created_at datetime default current_timestamp,
            constraint fk_race_id
                foreign key (race_id)
                references races(id));

        create table if not exists tags(
            uid text not null,
            user_id unsigned integer,
            constraint fk_user_id
                foreign key (user_id)
                references users(id));
    `;

    db.run(createTablesIfNotExists);
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

