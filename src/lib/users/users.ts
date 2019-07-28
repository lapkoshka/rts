import db from '../../modules/database';

export interface User {
    uid: string;
    firstname?: string;
    lastname?: string;
    alreadyRegistred: boolean;
}

export const submitNewUser = (user: User): void => {
    if (user.alreadyRegistred) {
        updateUser(user);
        return;
    }

    insertUser(user);
}

export const getUser = async(uid: string): Promise<User> => {
    const user: User = {
        uid,
        alreadyRegistred: false
    };

    return new Promise((resolve, reject) => {
        db.get(`select * from users where uid = (?)`, [uid], (err, row) => {
            console.log(row);
            if (!row) {
                resolve(user);
                return;
            }

            user.alreadyRegistred = true;
            resolve(Object.assign(user, row));
        })
    });
}

const updateUser = (user: User): void => {
    const { uid, firstname, lastname } = user;
    db.run(`update users 
        set
        firstname = (?),
        lastname = (?)
        where uid = (?)
    `, [firstname, lastname, uid], (err: any, row: any) => {
        if (err) {
            // TODO: logger for exceptions with gui on client
            throw Error(`Something went wrong with user update: ${err.message}`);
        }

        console.log('User updated');
    });
}

const insertUser = (user: User): void => {
    const { uid, firstname, lastname } = user;

    db.run(`insert into users(
        uid,
        firstname,
        lastname
        ) values (?, ?, ?)`, [uid, firstname, lastname], function(err) {

        const isUserAlreadyExist = err && 
            err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.uid';
        if (isUserAlreadyExist) {
            // TODO: logger for exceptions with gui on client
            throw Error(`User with uid ${uid} already exist`);
        }

        console.log(`A row has been inserted with uid ${uid}`);
    });
}