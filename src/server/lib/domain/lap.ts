import * as EventEmitter from 'events';
import { RaceParams } from '../../controllers/race/controller';
import { UserData } from '../../modules/database/users';
import { RFIDTag } from '../readers/base-reader';
import RSSITrace, { RSSITraceEvent } from '../rssi-trace';
import { shouldAppendTag } from './lib';

export enum LAP_EVENT {
    ON_START = 'onStart',
    ON_FINISH = 'onFinish',
}

export const defaultRaceParams: RaceParams = {
    rssiFilter: [0, 80],
    rssiTraceTimeout: 1000,
};

class Lap extends EventEmitter {
    public user: UserData;
    public startTrace: RSSITrace;
    public finishTrace: RSSITrace;
    private params: RaceParams;

    constructor(user: UserData, params: RaceParams) {
        super();
        this.user = user;
        this.startTrace = undefined;
        this.finishTrace = undefined;
        this.params = params;
    }

    public appendTag(tag: RFIDTag): void {
        if (!shouldAppendTag(tag, this.params.rssiFilter)) {
            return;
        }

        const { rssiTraceTimeout } = this.params;
        if (!this.startTrace) {
            this.startTrace = new RSSITrace(tag, rssiTraceTimeout);
            this.startTrace
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    this.emit(LAP_EVENT.ON_START, this);
                });
        }

        if (!this.startTrace.completed) {
            this.startTrace.appendPoint(tag);
            return;
        }

        if (!this.finishTrace) {
            this.finishTrace = new RSSITrace(tag, rssiTraceTimeout);
            this.finishTrace
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    this.emit(LAP_EVENT.ON_FINISH, this);
                });
        }

        if (!this.finishTrace.completed) {
            this.finishTrace.appendPoint(tag);
            return;
        }
    }

    public getTotalTime(): number {
        const highestStart = this.startTrace.getHighestPoint();
        const highestFinish = this.finishTrace.getHighestPoint();
        return highestFinish.timestamp - highestStart.timestamp;
    }
}

export default Lap;
