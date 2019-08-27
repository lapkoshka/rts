import { RFIDTag } from '../../../lib/readers/base-reader';
import { getUsers, UserData } from '../../database/database';

const usersMapCache = new Map();
export const getUsersMap = (users: UserData[]) => {
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
    try {
        const users = await getUsers();
        return getUsersMap(users).get(tag.uid);
    } catch (err) {
        throw err;
    }
};
