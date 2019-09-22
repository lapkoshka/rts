import { makeArr } from './helpers';

describe('helpers.ts', () => {
    it('makeArr', () => {
        const toOnly = makeArr(3);
        expect(toOnly).toEqual([0, 1, 2]);

        const fromAndTo = makeArr(1, 4);
        expect(fromAndTo).toEqual([1, 2, 3]);

        const step = makeArr(2, 7, 2);
        expect(step).toEqual([2, 4, 6]);
    });
});
