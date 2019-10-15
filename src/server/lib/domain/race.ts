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
    START = 'onRaceStart',
    LAP_FINISH = 'onRaceLapFinish',
    FINISH = 'onRaceFinish',
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
    private lapsFinished: number;

    constructor(user: UserData, params: RaceParams) {
        super();
        this.laps = [];
        this.user = user;
        this.params = params;
        this.lapsFinished = 0;
    }

    public getLapsCounter(): string {
        return `${this.lapsFinished + 1}/${this.params.maxLaps}`;
    }

    public getBestTime(): number {
        const bestLap = this.laps
            .map((lap: Lap) => lap)
            .sort((a: Lap, b: Lap) =>
                 a.getTotalTime() - b.getTotalTime())[0];
        if (!bestLap) {
            return null;
        }

        return bestLap.getTotalTime();
    }

    public appendTag(tag: RFIDTag): void {
        if (!shouldAppendTag(tag, this.params.rssiFilter)) {
            return;
        }

        if (this.isCompleted()) {
            throw Error('Can\'t append tag to completed race');
        }

        const lap = this.getCurrentLap() || this.createNewLap();
        lap.appendTag(tag);
    }

    private getCurrentLap(): Lap {
        return this.laps[this.laps.length - 1];
    }

    private isCompleted(): boolean {
        const lap = this.getCurrentLap();
        return this.isLastLap(lap) && lap.isCompleted();
    }

    private getPreviousLap(): Lap {
        const current = this.getCurrentLap();
        return this.laps[this.laps.indexOf(current) - 1];
    }

    private isLastLap(lap?: Lap): boolean {
        return this.laps.indexOf(lap) + 1 === this.params.maxLaps;
    }

    private createNewLap(): Lap {
        if (this.laps.length === this.params.maxLaps) {
            throw Error('Laps count cannot be more than maxLaps param');
        }

        const lap = new Lap(this.params.rssiTraceTimeout);
        this.laps.push(lap);

        const isFirstLap = this.laps.indexOf(lap) === 0;
        if (isFirstLap) {
            lap.on(LAP_EVENT.START, () => {
                this.emit(RACE_EVENT.START);
            });
        }

        const previousLap = this.getPreviousLap();
        if (previousLap) {
            lap.startTrace = previousLap.finishTrace;
        }

        lap.on(LAP_EVENT.FINISH, () => {
            this.lapsFinished++;
            this.emit(RACE_EVENT.LAP_FINISH, lap);
            if (this.isLastLap(lap)) {
                this.emit(RACE_EVENT.FINISH);
                return;
            }
            this.createNewLap();
        });

        return lap;
    }
}

export default Race;
