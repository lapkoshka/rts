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
                rssi: 999,
            });
            done();
        });
        lap.appendTag(createFakeTag('123', 666));
        lap.appendTag(createFakeTag('123', 999));
    });

    it('should be called onFinish', async (done) => {
        const lap = new Lap(fakeUser, defaultRaceParams);
        lap.on(LAP_EVENT.ON_FINISH, (lap: Lap) => {
            expect(lap.user).toBe(fakeUser);
            done();
        });

        lap.appendTag(createFakeTag('123', 666));
        lap.appendTag(createFakeTag('123', 999));
        await sleep(TRACE_FILLING_TIMEOUT + 100);
        lap.appendTag(createFakeTag('123', 123));
        lap.appendTag(createFakeTag('123', 321));
    });

    it('should be approx 5s between both timestamps', async (done) => {
        const lap = new Lap(fakeUser, defaultRaceParams);
        lap.on(LAP_EVENT.ON_FINISH, (lap: Lap) => {
            expect(lap.user).toBe(fakeUser);
            expect(lap.getTotalTime()).toBeGreaterThanOrEqual(4999);
            expect(lap.getTotalTime()).toBeLessThanOrEqual(5001);
            done();
        });

        lap.appendTag(createFakeTag('123', 666));
        await sleep(5000);
        lap.appendTag(createFakeTag('123', 123));
    });
});


// TODO:
// pick props for other components
// onclick on all menu of ip addresses
// TODO: value from html?
//  -fix broken tests
//  -add new tests with params
