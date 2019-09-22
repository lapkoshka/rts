export const createRange = (from: number, size: number): number[] =>
    Array.from(Array(size)).map((_, i) => i + from);
