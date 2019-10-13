import { UserData } from '../../modules/database/users';
import { sleep } from '../functions';
import { createFakeTag } from '../readers/main-reader.spec';
import Race, { defaultRaceParams, RACE_EVENT } from './race';

describe('race', () => {
    const fakeUser: UserData = {
        uid: '123',
        firstname: '',
        lastname: '',
        alreadyRegistred: true,
    };

    it('should dispatch START', (done) => {
        const race = new Race(fakeUser, defaultRaceParams);
        race.on(RACE_EVENT.START, () => {
            done();
        });
        race.appendTag({
            uid: '123',
            rssi: 80,
        });
    });

    it ('should dispatch FINISH', async (done) => {
       const race = new Race(fakeUser, {
           ...defaultRaceParams,
           maxLaps: 2,
       });

       race.on(RACE_EVENT.FINISH, () => {
          done();
       });

       race.appendTag(createFakeTag('123', 80));
       await sleep(1000);
       race.appendTag(createFakeTag('123', 80));
       await sleep(1000);
       race.appendTag(createFakeTag('123', 80));
    });

    it ('should dispatch LAP_FINISH', async () => {
        const race = new Race(fakeUser, {
            ...defaultRaceParams,
            maxLaps: 2,
        });
        let lapsFinished = 0;

        race.on(RACE_EVENT.LAP_FINISH, () => {
            lapsFinished++;
        });

        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        expect(lapsFinished).toBe(1);
    });

    it ('should dispatch LAP_FINISH twice', async () => {
        const race = new Race(fakeUser, {
            ...defaultRaceParams,
            maxLaps: 2,
        });
        let lapsFinished = 0;
        let raceFinished = false;

        race.on(RACE_EVENT.LAP_FINISH, () => {
            lapsFinished++;
        });

        race.on(RACE_EVENT.FINISH, () => {
            raceFinished = true;
        });

        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        expect(lapsFinished).toBe(1);
        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        expect(lapsFinished).toBe(2);
        expect(raceFinished).toBe(true);
    });

    it ('should correctly filtered tags', async () => {
        const race = new Race(fakeUser, {
            ...defaultRaceParams,
            rssiFilter: [50, 80],
            maxLaps: 2,
        });
        let lapsFinished = 0;
        let raceFinished = false;

        race.on(RACE_EVENT.LAP_FINISH, () => {
            lapsFinished++;
        });

        race.on(RACE_EVENT.FINISH, () => {
            raceFinished = true;
        });

        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);
        expect(lapsFinished).toBe(1);

        race.appendTag(createFakeTag('123', 35)); // <--
        await sleep(1000);
        expect(lapsFinished).toBe(1); // <-- same

        race.appendTag(createFakeTag('123', 80));
        await sleep(1000);

        expect(lapsFinished).toBe(2);
        expect(raceFinished).toBe(true);
    });
});

