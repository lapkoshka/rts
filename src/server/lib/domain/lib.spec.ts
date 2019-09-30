import { shouldAppendTag } from './lib';

describe('domain/lib.ts', () => {
    describe('shouldAppendTag', () => {
       it('should return correct boolean', () => {
           expect(shouldAppendTag({uid: '123', rssi: 1}, [0, 80])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 40}, [0, 80])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 80}, [0, 80])).toBe(true);

           expect(shouldAppendTag({uid: '123', rssi: 19}, [20, 60])).toBe(false);
           expect(shouldAppendTag({uid: '123', rssi: 20}, [20, 60])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 21}, [20, 60])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 59}, [20, 60])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 60}, [20, 60])).toBe(true);
           expect(shouldAppendTag({uid: '123', rssi: 61}, [20, 60])).toBe(false);
       });
    });
});
