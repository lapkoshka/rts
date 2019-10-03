import * as EventEmitter from 'events';
import { UserData } from '../../modules/database/users';
import { RFIDTag } from '../readers/base-reader';
import Lap, { LAP_EVENT } from './lap';
import { shouldAppendTag } from './lib';

export interface RaceParams {
    rssiFilter: [number, number];
    rssiTraceTimeout: number;
    maxLaps: number;
}

export enum RACE_EVENT {
    ON_START = 'onRaceStart',
    ON_LAP_FINISH = 'onRaceLapFinish',
    ON_FINISH = 'onRaceFinish',
}

export const defaultRaceParams: RaceParams = {
    rssiFilter: [0, 80],
    rssiTraceTimeout: 1000,
    maxLaps: 1,
};

class Race extends EventEmitter {
    public user: UserData;
    private laps: Lap[];
    private params: RaceParams;

    constructor(user: UserData, params: RaceParams) {
        super();
        this.laps = [];
        this.user = user;
        this.params = params;
    }

    public appendTag(tag: RFIDTag): void {
        if (!shouldAppendTag(tag, this.params.rssiFilter)) {
            return;
        }

        if (this.isCompleted()) {
            throw Error('Can\'t append tag to completed race');
        }

        let lap = this.getCurrentLap();
        if (lap.isCompleted()) {
            lap = this.createNewLap();
        }

        lap.appendTag(tag);
    }

    private isCompleted(): boolean {
        const lap = this.getCurrentLap();
        return this.isLastLap(lap) && lap.isCompleted();
    }

    private getCurrentLap(): Lap {
        const lap = this.laps[this.laps.length - 1];
        return lap || this.createNewLap();
    }

    private getPreviousLap(): Lap {
        const current = this.getCurrentLap();
        return this.laps[this.laps.indexOf(current) - 1];
    }

    private isFirstLap(lap?: Lap): boolean {
        return this.laps.indexOf(lap) === 0;
    }

    private isLastLap(lap?: Lap): boolean {
        return this.laps.indexOf(lap) + 1 === this.params.maxLaps;
    }

    private createNewLap(): Lap {
        const lap = new Lap(this.params.rssiTraceTimeout);
        if (this.isFirstLap(lap)) {
            lap.on(LAP_EVENT.ON_START, () => {
                this.emit(RACE_EVENT.ON_START);
            });
        }

        const { finishTrace } = this.getPreviousLap();
        lap.startTrace = finishTrace;
        lap.on(LAP_EVENT.ON_FINISH, () => {
            this.emit(RACE_EVENT.ON_LAP_FINISH);
            if (this.isLastLap(lap)) {
                this.emit(RACE_EVENT.ON_FINISH);
            }
        });

        this.laps.push(lap);
        return lap;
    }
}

export default Race;
