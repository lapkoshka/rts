import { UserData } from '../../modules/database/users';
import { RFIDTag } from '../readers/base-reader';
import RSSITrace, { RSSITraceEvent } from '../rssi-trace';
import * as EventEmitter from 'events';

export enum LAP_EVENT {
    ON_START = 'onStart',
    ON_FINISH = 'onFinish',
}

class Lap extends EventEmitter {
    public user: UserData;
    public startTrace: RSSITrace;
    public finishTrace: RSSITrace;

    constructor(user: UserData) {
        super();
        this.user = user;
        this.startTrace = undefined;
        this.finishTrace = undefined;
    }

    public appendTag(tag: RFIDTag): void {
        if (!this.startTrace) {
            this.startTrace = new RSSITrace(tag);
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
            this.finishTrace = new RSSITrace(tag);
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

