import * as fs from "fs";
import { Database, verbose } from 'sqlite3';

const sqlite3 = verbose();
const DATABASE_CATALOG = './data';
const DATABASE_PATH = DATABASE_CATALOG + '/rts.db';

const openDatabase = (): Database => {
    if (!fs.existsSync(DATABASE_CATALOG)) {
        fs.mkdirSync(DATABASE_CATALOG);
    }

    return new sqlite3.Database(DATABASE_PATH, (err: Error) => {
        if (err) {
            throw err;
        }

        console.log(`Connected to the ${DATABASE_PATH} SQlite database.`);
    });
};

const prepareDatabase = async (db: Database): Promise<void> => {
    try {
        await db.run(`create table if not exists contests(
                id integer primary key autoincrement,
                name text,
                description text,
                laps unsigned integer,
                started_flag unsigned integer,
                finished_flag unsigned integer,
                start_time unsigned integer,
                finish_time unsigned integer)`);

        await db.run(`create table if not exists users(
            id integer primary key autoincrement,
            firstname text,
            lastname text,
            thirdname text,
            email text,
            phone text,
            about text,
            number integer,
            city text,
            bike text)`);

        await db.run(`create table if not exists races(
            id integer primary key autoincrement,
            user_id unsigned integer,
            contest_id unsigned integer,
            timestamp datetime default current_timestamp,
            time unsigned integer,
    
            constraint fk_user_id
                foreign key (user_id)
                references users(id),
            constraint fk_contest_id
                foreign key (contest_id)
                references contest(id))`);

        await db.run(`create table if not exists laps(
            id integer primary key autoincrement,
            number unsigned integer,
            race_id unsigned integer,
            time unsigned integer,
            created_at datetime default current_timestamp,
            constraint fk_race_id
                foreign key (race_id)
                references races(id))`);

        //todo: id integer primary key autoincrement
        await db.run(`create table if not exists tags(
            uid text not null unique,
            user_id unsigned integer,
            constraint fk_user_id
                foreign key (user_id)
                references users(id));`);

        await db.run(`create table if not exists tag_contest(
            tag_uid text,
            contest_id integer,
            constraint fk_contest_id
                foreign key (contest_id)
                references contests(id))`);
    } catch (e) {
        throw Error(e.message);
    }
};

/**
 * Есть вероятность того что нужно делать подключение и подготовку БД асинхронно потому что
 * на момент первого запроса она еще не готова. Чтобы этого избежать нужно
 * экспортировать подключение к БД как промис, но в таком случае нужно везде будет писать await и делать все методы
 * асинхронными что не очень удобно. Чтобы этого избежать нужно писать очередь, которая будет резолвится по готовности
 * БД, но это очередной пласт логики.
 *
 * Все это делать лень и красиво написанный код вокруг БД откладывается до тех времен
 * пока приложение себя не покажет (тогда и причесать можно будет), а пока-что так работает и ок.
 */
export const createAndPrepareDatabase = (): Database => {
    const database = openDatabase();
    prepareDatabase(database);

    return database;
};
