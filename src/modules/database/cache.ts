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

// TODO: research database type error after proxy wrap, method: get
// const proxyDbAllMethod = (target: any, name: string) => {
//     return (query: string, handler: Function) => {
//         const cached = databaseCache[query];
//         if (cached) {
//             return handler(null, cached);
//         }
//
//         target[name](query, (err: any, rows: any) => {
//             if (!err) {
//                 databaseCache[query] = rows;
//             }
//             handler(err, rows);
//         });
//     };
// };
//
// export const databaseProxyHandler = {
//     get: (target: any, name: string) => {
//         console.log(name);
//         if (name === 'all') {
//             return proxyDbAllMethod(target, name);
//         }
//
//         if (name in target) {
//             return target[name];
//         }
//
//         throw new Error(`Unsupported propery "${name}"`);
//     },
// };
