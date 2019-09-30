import { UserData } from '../../modules/database/users';
import { sleep } from '../functions';
import { createFakeTag } from '../readers/main-reader.spec';
import Lap, { defaultRaceParams, LAP_EVENT } from './lap';

const TRACE_FILLING_TIMEOUT = 1000;

jest.setTimeout(10000);

describe('lap', () => {
    const fakeUser: UserData = {
        uid: '123',
        firstname: '',
        lastname: '',
        alreadyRegistred: true,
    };

    it('should be called onStart', (done) => {
        const lap = new Lap(fakeUser, defaultRaceParams);
        lap.on(LAP_EVENT.ON_START, (lap: Lap) => {
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
        const lap = new Lap(fakeUser, defaultRaceParams);
        lap.on(LAP_EVENT.ON_FINISH, (lap: Lap) => {
            expect(lap.user).toBe(fakeUser);
            done();
        });

        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
        await sleep(TRACE_FILLING_TIMEOUT + 100);
        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 80));
    });

    it('should be approx 5s between both timestamps', async (done) => {
        const lap = new Lap(fakeUser, defaultRaceParams);
        lap.on(LAP_EVENT.ON_FINISH, (lap: Lap) => {
            expect(lap.user).toBe(fakeUser);
            expect(lap.getTotalTime()).toBeGreaterThanOrEqual(4999);
            expect(lap.getTotalTime()).toBeLessThanOrEqual(5001);
            done();
        });

        lap.appendTag(createFakeTag('123', 70));
        await sleep(5000);
        lap.appendTag(createFakeTag('123', 70));
    });

    it('tag should be correctly filtered', async (done) => {
        const lap = new Lap(fakeUser, {
            ...defaultRaceParams,
            rssiFilter: [20, 60],
        });

        lap.on(LAP_EVENT.ON_START, (lap: Lap) => {
            const { startTrace } = lap;
            expect(startTrace.getHighestPoint().tag).toEqual({
                uid: '123',
                rssi: 50,
            });

            done();
        });
        lap.appendTag(createFakeTag('123', 70));
        lap.appendTag(createFakeTag('123', 50));
    });
});
