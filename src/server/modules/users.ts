import { RFIDTag } from '../lib/readers/base-reader';
import { dbMorda } from './database/database';
import { UserData } from './database/tables/users';

const usersMapCache = new Map();
const getUsersMap = (users: UserData[]) => {
    const cached = usersMapCache.get(users);
    if (cached) {
        return cached;
    }

    const usersMap = users.reduce((map: Map<string, UserData>, user: UserData) => {
        map.set(user.uid, user);
        return map;
    }, new Map());
    usersMapCache.set(users, usersMap);
    return usersMap;
};

export const getUserByTag = async (tag: RFIDTag): Promise<UserData> => {
    const users = await dbMorda.users.getUsers();
    return getUsersMap(users).get(tag.uid);
};
