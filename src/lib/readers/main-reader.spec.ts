import { RFIDTag } from '../types';
import MainReader from './main-reader';

export const createFakeTag = (uid: string, rssi: number): RFIDTag => ({ uid, rssi });

describe('base-reader methods', () => {
    let mainReader: MainReader;
    beforeEach(() => {
        mainReader = new MainReader('/');
    });

    it('should be dispatch fake tag', (done) => {
        mainReader.on('tag', (tag) => {
            expect(tag).toEqual({
                uid: '123',
                rssi: 999,
            });
            done();
        });

        mainReader.fakeTag('123', 999);
    });
});

