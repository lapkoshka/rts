// i dont like placement of this module
import { getUsers } from '../modules/database/database';
import { RFIDTag, User } from './types';

const usersMapCache = new Map();
export const getUsersMap = (users: User[]) => {
    const cached = usersMapCache.get(users);
    if (cached) {
        return cached;
    }

    const usersMap = users.reduce((map: Map<string, User>, user: User) => {
        map.set(user.uid, user);
        return map;
    }, new Map());
    usersMapCache.set(users, usersMap);
    return usersMap;
};

export const getUserByTag = async (tag: RFIDTag): Promise<User> => {
    const users = getUsersMap(await getUsers());
    return users.get(tag.uid);
};
