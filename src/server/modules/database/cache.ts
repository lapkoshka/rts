interface DatabaseCache {
    [key: string]: any;
    clear: () => void;
}

export const databaseCache: DatabaseCache = {
    clear(): void {
        Object.keys(this).forEach((key: string) => {
            if (key !== 'clear') {
                delete this[key];
            }
        });
    },
};
