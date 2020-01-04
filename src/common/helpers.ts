export const makeArr = (fromOrTo: number, to?: number, step: number = 1) => {
    const start = to ? fromOrTo : 0;
    const end = to || fromOrTo;

    const arr = [];
    for (let i = start; i < end; i += step) {
        arr.push(i);
    }

    return arr;
};

export const getTimestamp = (): number => new Date().valueOf();
