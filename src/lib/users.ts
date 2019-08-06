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

export const toHumanReadableTime = (t: any): string => {
    if (t === null) {
        return '-';
    }

    if (Number.isInteger(t)) {
        return toHumanReadableTime(new Date(t));
    }

    if (!(t instanceof Date)) {
        throw new Error('Assertion error');
    }

    const min = t.getMinutes();
    const sec = t.getSeconds();
    const ms = t.getMilliseconds();
    let formatted = min.toString().length < 2 ? `0${min}:` : `${min}:`;
    formatted += sec.toString().length < 2 ? `0${sec}:` : `${sec}:`;
    switch (ms.toString().length) {
        case 3:
            formatted += ms;
            break;
        case 2:
            formatted += `0${ms}`;
            break;
        case 1:
            formatted += `00${ms}`;
            break;
        default:
            formatted += ms;
    }

    return formatted;
};
