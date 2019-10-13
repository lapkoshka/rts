import { sleep } from '../functions';
import { createFakeTag } from '../readers/main-reader.spec';
import Lap, { LAP_EVENT } from './lap';

jest.setTimeout(10000);

describe('lap', () => {
    it('should be called onStart', (done) => {
        const lap = new Lap(1000);
        lap.on(LAP_EVENT.START, (lap: Lap) => {
            expect(lap.startTrace.getHighestPoint().tag).toEqual({
                uid: '123',
                rssi: 80,
            });
            done();
        });
        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
    });

    it('should be called onFinish', async (done) => {
        const lap = new Lap(1000);
        lap.on(LAP_EVENT.FINISH, () => {
            done();
        });

        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
    });

    it('should be called onFinish with non-default rssi-trace timeout', async (done) => {
        const lap = new Lap(1000);
        lap.on(LAP_EVENT.FINISH, (lap: Lap) => {
            expect(lap.isCompleted()).toBe(true);
            done();
        });

        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
        await sleep(3000);
        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
    });

    it('should be approx 5s between both timestamps', async (done) => {
        const lap = new Lap(1000);
        lap.on(LAP_EVENT.FINISH, (lap: Lap) => {
            expect(lap.getTotalTime()).toBeGreaterThanOrEqual(4999);
            expect(lap.getTotalTime()).toBeLessThanOrEqual(5001);
            done();
        });

        lap.appendTag(createFakeTag('123', 70));
        await sleep(5000);
        lap.appendTag(createFakeTag('123', 70));
    });
});
