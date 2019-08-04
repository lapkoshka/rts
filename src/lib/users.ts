import { User } from './types';

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
