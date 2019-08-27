import { sleep } from '../../../lib/functions';
import { createFakeTag } from '../../../lib/readers/main-reader.spec';
import { TRACE_FILLING_TIMEOUT } from '../../../lib/rssi-trace';
import RSSITracePoint from '../../../lib/rssi-trace-point';
import { UserData } from '../../database/database';
import Lap from './lap';

jest.setTimeout(10000);

describe('lap', () => {
    const fakeUser: UserData = {
        uid: '123',
        alreadyRegistred: true,
    };

    it('should be called onStart', (done) => {
        const lap = new Lap(fakeUser);
        lap.onStart = (tracePoint: RSSITracePoint) => {
            expect(tracePoint.tag).toEqual({
                uid: '123',
                rssi: 999,
            });
            done();
        };
        lap.appendTag(createFakeTag('123', 666));
        lap.appendTag(createFakeTag('123', 999));
    });

    it('should be called onFinish', async (done) => {
        const lap = new Lap(fakeUser);
        lap.onFinish = (user: UserData) => {
            expect(user).toBe(fakeUser);
            done();
        };

        lap.appendTag(createFakeTag('123', 666));
        lap.appendTag(createFakeTag('123', 999));
        await sleep(TRACE_FILLING_TIMEOUT + 100);
        lap.appendTag(createFakeTag('123', 123));
        lap.appendTag(createFakeTag('123', 321));
    });

    it('should be approx 5s between both timestamps', async (done) => {
        const lap = new Lap(fakeUser);
        lap.onFinish = (user: UserData, time: number) => {
            expect(user).toBe(fakeUser);
            expect(time).toBeGreaterThanOrEqual(4999);
            expect(time).toBeLessThanOrEqual(5001);
            done();
        };

        lap.appendTag(createFakeTag('123', 666));
        await sleep(5000);
        lap.appendTag(createFakeTag('123', 123));
    });
});
