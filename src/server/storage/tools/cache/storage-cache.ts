export enum CACHE_KEY {
    GET_USERS = 'cache/get_users',
    GET_CURRENT_CONTEST_ID = 'cache/get_current_contest_id'
}

const cache: { [key: string ]: any } = {};

export class StorageCache {
    public static get(key: CACHE_KEY): any {
        return cache[key];
    }

    public static set(key: CACHE_KEY, data: any): void {
        cache[key] = data;
    }

    public static clearAll(): void {
        Object.keys(cache).forEach((key: string) => {
            delete cache[key];
        });
    }

    public static has(key: CACHE_KEY): boolean {
        return cache[key] !== undefined;
    }
}
